import { endpointsFactory } from "../../lib/resultHandler.js";
import { DependsOnMethod } from "express-zod-api";
import {
  AuthRequestSchema,
  AuthResponseSchema,
} from "../../schemas/public/authSchema.js";
import { setPublicSessionCookie } from "../../middelware/publicAuth.js";

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
