import { endpointsFactory } from "../../lib/resultHandler.js";
import { DependsOnMethod, Middleware } from "express-zod-api";
import {
  AuthRequestSchema,
  AuthResponseSchema,
} from "../../schemas/public/authSchema.js";
import { PublicAuthService } from "../../services/public/authService.js";
import { env } from "../../env.js";

const setPublicSessionCookie = new Middleware({
  input: AuthRequestSchema,
  handler: async ({ input, response }) => {
    const result = await PublicAuthService.authenticate(input);

    response.cookie("public_session_id", result.sessionId, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: env.PUBLIC_SESSION_MAX_AGE,
      path: "/",
      signed: true,
    });

    return {};
  },
});

const publicAuthEndpoint = endpointsFactory
  .addMiddleware(setPublicSessionCookie)
  .build({
    method: "post",
    input: AuthRequestSchema,
    output: AuthResponseSchema,
    handler: async () => {
      return { success: true };
    },
    shortDescription: "Authenticates a user with a token",
    description: "Authenticates a user with a token.",
    tag: "auth",
  });

export const PublicAuthRouting = new DependsOnMethod({
  post: publicAuthEndpoint,
});
