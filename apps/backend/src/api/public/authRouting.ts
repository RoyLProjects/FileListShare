import { endpointsFactory } from "../../lib/resultHandler.js";
import { DependsOnMethod } from "express-zod-api";
import {
  AuthRequestSchema,
  AuthResponseSchema,
} from "../../schemas/public/authSchema.js";
import {
  requirePublicAuth,
  setPublicSessionCookie,
} from "../../middelware/publicAuth.js";
import z from "zod";

const PostPublicAuthEndpoint = endpointsFactory
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

const GetPublicAuthEndpoint = endpointsFactory
  .addMiddleware(requirePublicAuth)
  .build({
    method: "get",
    input: z.object({}),
    output: z.object({ success: z.boolean() }),
    handler: async () => {
      return { success: true };
    },
    shortDescription: "checks if user is authenticated",
    description: "checks if user is authenticated with a token.",
    tag: "auth",
  });

export const PublicAuthRouting = new DependsOnMethod({
  post: PostPublicAuthEndpoint,
  get: GetPublicAuthEndpoint,
});
