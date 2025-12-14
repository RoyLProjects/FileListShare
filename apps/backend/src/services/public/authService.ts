import { getAppPrismaClient } from "../../lib/db.js";
import { AuthRequestSchema } from "../../schemas/public/authSchema.js";
import argon2 from "argon2";

import { ForbiddenError, NotFoundError } from "../../lib/resultHandler.js";
import { logger } from "../../lib/log.js";
import { generateRandomString } from "../../lib/pkce.js";
import {
  PublicSessionData,
  PublicSessionStore,
} from "../../lib/PublicSessionStore.js";
import { z } from "zod";

export class PublicAuthService {
  static async authenticate(
    input: z.infer<typeof AuthRequestSchema>,
  ): Promise<{ success: true; sessionId: string }> {
    const prisma = getAppPrismaClient();
    const publicLink = await prisma.publicLink.findUnique({
      where: { token: input.token },
    });

    if (!publicLink) {
      // do not log the token or session identifiers here (avoid leaking PII)
      logger.warn("Public link not found or expired");
      throw new NotFoundError("Public link not found or expired");
    }

    if (publicLink.passwordHash) {
      if (!input.password) {
        // password was required but not provided
        logger.warn("Public link requires a password but none was provided");
        throw new ForbiddenError("Password required");
      }
      // Verify password using argon2
      const isValid = await argon2.verify(
        publicLink.passwordHash,
        input.password,
      );
      if (!isValid) {
        // invalid password attempt — do not log the supplied password or token
        logger.warn("Invalid password provided for public link authentication");
        throw new ForbiddenError("Invalid password");
      }
    }
    // Create session with data
    const sessionId = generateRandomString(32);
    const publicSessionData: PublicSessionData = {
      token: input.token,
      listId: publicLink.listId,
    };

    await PublicSessionStore.create(sessionId, publicSessionData);

    // Authentication succeeded (do NOT include token/session in logs)
    logger.info("Public link authenticated successfully");
    return { success: true, sessionId };
  }
}
