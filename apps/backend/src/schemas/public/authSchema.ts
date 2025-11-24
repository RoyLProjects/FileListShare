import { z } from "zod";
import { password, token } from "../dashboard/domainSchema.js";

export const AuthRequestSchema = z.object({
  token: token,
  password: password,
});

export const AuthResponseSchema = z.object({
  success: z.boolean(),
});
