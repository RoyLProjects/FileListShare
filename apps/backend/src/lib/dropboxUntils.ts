import { env } from "../env.js";
import { decryptRefreshToken } from "./crypto.js";
import { getAppPrismaClient } from "./db.js";
import { DropboxTokenStore } from "./DropboxTokenStore.js";
import { logger } from "./log.js";

interface DropboxTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * Refreshes a Dropbox access token using a refresh token
 * decrypts the refresh token before use
 * @param refreshToken - The encrypted refresh token
 * @returns Promise resolving to token response
 * @throws Error if token refresh fails
 */
async function refreshDropboxToken(
  refreshToken: string,
): Promise<DropboxTokenResponse> {
  const decryptedRefreshToken = decryptRefreshToken(refreshToken);

  const tokenResponse = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: decryptedRefreshToken,
      client_id: env.DROPBOX_CLIENT_ID,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    logger.error({ errorText }, "Token refresh error");
    throw new Error("Failed to refresh Dropbox access token");
  }

  return (await tokenResponse.json()) as DropboxTokenResponse;
}

/**
 * Gets a valid Dropbox access token based on userId and optional teamId
 * First checks Redis cache, then refreshes from storage if needed
 * @param userId - The user ID
 * @param teamId - Optional team ID (if omitted, uses user's personal storage)
 * @returns Valid access token
 * @throws Error if storage not found or token refresh fails
 */
export async function getDropboxAccessToken(
  userId: string,
  teamId?: string,
): Promise<string> {
  const contextId = teamId || userId;

  const cachedToken = await DropboxTokenStore.get(contextId, userId);
  if (cachedToken) {
    return cachedToken.accessToken;
  }

  let storage;

  if (teamId) {
    const prisma = getAppPrismaClient();
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: { some: { userId } },
      },
      include: { storage: true },
    });

    if (!team) {
      throw new Error("Team not found or access denied");
    }

    storage = team.storage;
  } else {
    // Fetch user's personal storage
    const prisma = getAppPrismaClient();
    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      include: { storage: true },
    });

    if (!userRecord) {
      throw new Error("User not found");
    }

    storage = userRecord.storage;
  }

  if (!storage) {
    throw new Error("Storage not configured");
  }

  if (storage.type !== "dropbox") {
    throw new Error("Storage is not Dropbox");
  }

  const tokens = await refreshDropboxToken(storage.refreshToken);

  await DropboxTokenStore.create(
    contextId,
    userId,
    tokens.access_token,
    tokens.expires_in,
  );

  return tokens.access_token;
}

/**
 * Gets Dropbox access token by storage ID (for management operations)
 * @param storageId - The storage ID
 * @param userId - The user ID (for caching purposes)
 * @returns Valid access token
 * @throws Error if storage not found or token refresh fails
 */
export async function getDropboxAccessTokenByStorageId(
  storageId: string,
  userId: string,
): Promise<string> {
  // Check if we have a cached token (using storageId as listId for storage-level operations)
  const cachedToken = await DropboxTokenStore.get(storageId, userId);
  if (cachedToken) {
    return cachedToken.accessToken;
  }
  const prisma = getAppPrismaClient();
  // Get storage info
  const storage = await prisma.storage.findUnique({
    where: {
      id: storageId,
    },
  });

  if (!storage || storage.type !== "dropbox") {
    throw new Error("Dropbox storage not found");
  }

  const tokens = await refreshDropboxToken(storage.refreshToken);

  await DropboxTokenStore.create(
    storageId,
    userId,
    tokens.access_token,
    tokens.expires_in,
  );

  return tokens.access_token;
}

/**
 * Gets a temporary Dropbox upload link for a file using a refresh token
 * @param refreshToken - The encrypted refresh token from storage
 * @param path - The file path where the file will be uploaded
 * @param duration - Link validity duration in seconds (default: 3600, max: 14400)
 * @returns Upload URL
 * @throws Error if token refresh or upload link generation fails
 */
export async function getDropboxUploadLink(
  refreshToken: string,
  path: string,
  duration: number = 3600,
): Promise<string> {
  const tokens = await refreshDropboxToken(refreshToken);

  // Get upload link from Dropbox
  const uploadLinkResponse = await fetch(
    "https://api.dropboxapi.com/2/files/get_temporary_upload_link",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commit_info: {
          path: path,
          mode: "add",
          autorename: true,
        },
        duration: duration,
      }),
    },
  );

  if (!uploadLinkResponse.ok) {
    const errorText = await uploadLinkResponse.text();
    logger.error({ errorText }, "Upload link error");
    throw new Error("Failed to get Dropbox upload link");
  }

  const uploadLinkData = (await uploadLinkResponse.json()) as { link: string };
  return uploadLinkData.link;
}
