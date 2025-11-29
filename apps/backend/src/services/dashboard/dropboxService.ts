import { z } from "zod";
import {
  CallbackOauthRequestSchema,
  CallbackOauthResponseSchema,
  DropboxStartRequestSchema,
  DropboxStartResponseSchema,
  getDropboxBrowseRequestSchema,
  getDropboxBrowseResponseSchema,
} from "../../schemas/dashboard/dropboxSchema.js";
import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
} from "../../lib/resultHandler.js";
import { getAppPrismaClient } from "../../lib/db.js";
import { generatePKCEPair, generateState } from "../../lib/pkce.js";
import { logger } from "../../lib/log.js";
import { env } from "../../env.js";
import { PKCEStore } from "../../lib/PKCEStore.js";
import { encryptRefreshToken } from "../../lib/crypto.js";
import { TokenStore } from "../../lib/TokenStore.js";
import { getDropboxAccessToken } from "../../lib/dropboxUntils.js";

export class DropboxService {
  static async start(
    data: z.infer<typeof DropboxStartRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof DropboxStartResponseSchema>> {
    const prisma = getAppPrismaClient();

    if (!data.teamId) {
      const userStorage = await prisma.storage.findUnique({
        where: { userId: userId },
      });
      if (userStorage) {
        logger.warn("Conflict: user already has storage connected");
        throw new ConflictError("User already has storage connected");
      }
    } else {
      const team = await prisma.team.findFirst({
        where: { id: data.teamId, members: { some: { userId } } },
        include: { storage: true },
      });
      if (!team) {
        logger.warn("Forbidden: user has no access to team");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }
      if (team.storage) {
        logger.warn("Conflict: team already has storage connected");
        throw new ConflictError("Team already has storage connected");
      }
    }

    const state = generateState();
    const { codeVerifier, codeChallenge, codeChallengeMethod } =
      generatePKCEPair();

    const pkcePayload: {
      codeVerifier: string;
      state: string;
      userId?: string;
      teamId?: string;
    } = {
      codeVerifier,
      state,
      ...(data.teamId ? { teamId: data.teamId } : { userId: userId })
    };

    await PKCEStore.create(state, pkcePayload);

    logger.info("Dropbox OAuth start for user");
    const authUrl = new URL("https://www.dropbox.com/oauth2/authorize");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", env.DROPBOX_CLIENT_ID);
    authUrl.searchParams.set(
      "redirect_uri",
      env.BASE_URL + "/dropbox/callback",
    );
    authUrl.searchParams.set(
      "scope",
      "files.metadata.read files.content.write",
    );
    authUrl.searchParams.set("token_access_type", "offline");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", codeChallengeMethod);
    authUrl.searchParams.set("force_reapprove", "true");

    return { url: authUrl.toString() };
  }

  static async callback(
    data: z.infer<typeof CallbackOauthRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof CallbackOauthResponseSchema>> {
    const pkceData = await PKCEStore.get(data.state);
    logger.info("Dropbox OAuth callback received");
    if (!pkceData) {
      throw new ForbiddenError("Invalid or expired state");
    }

    const pkceUser = pkceData.userId;
    const pkceTeam = pkceData.teamId;
    await PKCEStore.delete(data.state);

    const prisma = getAppPrismaClient();

    if (pkceUser) {
      if (pkceUser !== userId) {
        throw new ForbiddenError("User mismatch");
      }
            const userStorage = await prisma.storage.findUnique({
        where: { userId: userId },
      });
      if (userStorage) {
        logger.warn("Conflict: user already has storage connected");
        throw new ConflictError("User already has storage connected");
      }
    } else if (pkceTeam) {
      const team = await prisma.team.findFirst({
        where: { id: pkceTeam, members: { some: { userId } } },
         include: { storage: true },
      });
      if (!team) {
        throw new ForbiddenError("User is not a member of the team");
      }
      if (team.storage) {
        logger.warn("Conflict: team already has storage connected");
        throw new ConflictError("Team already has storage connected");
      }
    } else {
      throw new ForbiddenError("Invalid PKCE data: no user or team");
    }

    const tokenResponse = await fetch(
      "https://api.dropboxapi.com/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: data.code,
          redirect_uri: env.BASE_URL + "/dropbox/callback",
          client_id: env.DROPBOX_CLIENT_ID,
          code_verifier: pkceData.codeVerifier,
          scope: "files.metadata.read files.content.write",
        }),
      },
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      logger.error({ errorText }, "Token exchange error");
      throw new InternalServerError("Failed to exchange code for token");
    }

    const tokens = (await tokenResponse.json()) as {
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
      refresh_token: string;
      account_id: string;
      uid: string;
    };

    if (!tokens.refresh_token) {
      logger.error("No refresh token received");
      throw new InternalServerError("No refresh token received");
    }

    const encryptedRefreshToken = encryptRefreshToken(tokens.refresh_token);

    if (pkceUser) {
      await TokenStore.create(userId, { refreshToken: encryptedRefreshToken });
      logger.info("Stored Dropbox refresh token for user");

      await prisma.storage.upsert({
        where: { userId },
        create: {
          type: "dropbox",
          displayName: `Dropbox (${tokens.account_id})`,
          refreshToken: encryptedRefreshToken,
          userId,
        },
        update: {
          displayName: `Dropbox (${tokens.account_id})`,
          refreshToken: encryptedRefreshToken,
        },
      });
    } else if (pkceTeam) {
      // store for team
      await prisma.storage.upsert({
        where: { teamId: pkceTeam },
        create: {
          type: "dropbox",
          displayName: `Dropbox (${tokens.account_id})`,
          refreshToken: encryptedRefreshToken,
          teamId: pkceTeam,
        },
        update: {
          displayName: `Dropbox (${tokens.account_id})`,
          refreshToken: encryptedRefreshToken,
        },
      });
    }
    let redirectUrl;
    if(pkceTeam) {
      redirectUrl = new URL(env.FRONTEND_URL + `/dashboard/teams/${pkceTeam}/settings`);
    } else {
      redirectUrl = new URL(env.FRONTEND_URL + "/dashboard/settings");
    }

    return { url: redirectUrl.toString() };
  }

  static async browse(
    data: z.infer<typeof getDropboxBrowseRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof getDropboxBrowseResponseSchema>> {
    const prisma = getAppPrismaClient();
    let storage;

    if (data.teamId) {
      const team = await prisma.team.findFirst({
        where: { id: data.teamId, members: { some: { userId } } },
        include: { storage: true, members: { where: { userId } } },
      });
      if (!team || !team.members.length) {
        logger.warn("Forbidden: user has no access to team storage");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team storage",
        );
      }
      storage = team.storage;
    } else {
      const userRecord = await prisma.user.findUnique({
        where: { id: userId },
        include: { storage: true },
      });
      if (!userRecord) {
        logger.warn("Forbidden: user not found");
        throw new ForbiddenError("Unauthorized: User not found");
      }
      storage = userRecord.storage;
    }

    if (!storage || storage.type !== "dropbox") {
      logger.warn("Forbidden: no dropbox storage found for user");
      throw new ForbiddenError(
        "Unauthorized: No dropbox storage found for user",
      );
    }

    const { path: requestedPath, cursor, teamId } = data;
    const accessToken = await getDropboxAccessToken(userId, teamId);

    let dropboxResponse: Response;
    try {
      if (cursor) {
        dropboxResponse = await fetch(
          "https://api.dropboxapi.com/2/files/list_folder/continue",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cursor }),
          },
        );
      } else {
        dropboxResponse = await fetch(
          "https://api.dropboxapi.com/2/files/list_folder",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: requestedPath || "",
              recursive: false,
              include_mounted_folders: true,
              include_non_downloadable_files: false,
            }),
          },
        );
      }
    } catch (err) {
      logger.error({ err }, "Dropbox API call failed");
      throw new InternalServerError("Failed to browse Dropbox folder");
    }

    if (!dropboxResponse.ok) {
      const errorText = await dropboxResponse.text();
      logger.error({ errorText }, "Dropbox API error");
      throw new InternalServerError("Failed to browse Dropbox folder");
    }

    const respJson = await dropboxResponse.json();

    return {
      entries: respJson.entries || [],
      cursor: respJson.cursor,
      has_more: !!respJson.has_more,
    };
  }
}
