import { Middleware } from "express-zod-api";
import { z } from "zod";
import {

  PublicSessionStore,
} from "../lib/PublicSessionStore.js";
import { UnauthorizedError } from "../lib/resultHandler.js";
import Cookies from "cookies";
import { AuthRequestSchema } from "../schemas/public/authSchema.js";
import { PublicAuthService } from "../services/public/authService.js";
import { env } from "../env.js";

export const requirePublicAuth = new Middleware({
  input: z.object({}),

  handler: async ({ request, logger, response }) => {
    logger.debug("Checking public session");

    try {
      const cookies = new Cookies(request, response, {
        keys: [env.PUBLIC_ENDPOINT_COOKIE_SECRET],
      });

      const publicSessionId = cookies.get("public_session_id", {
        signed: true,
      });

      if (!publicSessionId) {
        throw new UnauthorizedError("Unauthorized - No session");
      }

      const sessionData = await PublicSessionStore.get(publicSessionId);

      if (!sessionData) {
        throw new UnauthorizedError("Unauthorized - Invalid session");
      }

      await PublicSessionStore.refresh(publicSessionId);

      return { session: sessionData };
    } catch (error) {
      logger.error("Public auth error:", error);
      throw new UnauthorizedError("Unauthorized");
    }
  },
});

export const setPublicSessionCookie = new Middleware({
  input: AuthRequestSchema,
  handler: async ({ input, request, response }) => {
    const result = await PublicAuthService.authenticate(input);

    // Create Cookies instance on the fly
    const cookies = new Cookies(request, response, {
      keys: [env.PUBLIC_ENDPOINT_COOKIE_SECRET],
    });

    cookies.set("public_session_id", result.sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: env.PUBLIC_SESSION_MAX_AGE, // in ms
      path: "/v1/public",
      signed: true,
    });

    return {};
  },
});