import { Middleware } from "express-zod-api";
import { z } from "zod";
import { env } from "../env.js";
import {
  PublicSessionData,
  PublicSessionStore,
} from "../lib/PublicSessionStore.js";
import { UnauthorizedError } from "../lib/resultHandler.js";

export const requirePublicAuth = new Middleware({
  input: z.object({}),

  handler: async ({ request, logger }) => {
    logger.debug("Checking public session");

    if (env.NODE_ENV === "development") {
      // Dev-mode bypass: simulate token/list
      const virtualToken: PublicSessionData = {
        token: "dev-token",
        listId: "dev-list-id",
      };
      return { session: virtualToken };
    }

    try {
      const reqWithCookies = request as unknown as {
        signedCookies?: Record<string, string>;
      };
      const publicSessionId = reqWithCookies.signedCookies?.public_session_id;

      if (!publicSessionId) {
        throw new UnauthorizedError("Unauthorized - No session");
      }

      const sessionData = await PublicSessionStore.get(publicSessionId);

      if (!sessionData) {
        throw new UnauthorizedError("Unauthorized - Invalid session");
      }

      // Refresh session TTL
      await PublicSessionStore.refresh(publicSessionId);

      return { session: sessionData };
    } catch (error) {
      logger.error("Public auth error:", error);
      throw new UnauthorizedError("Unauthorized");
    }
  },
});
