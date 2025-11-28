import { z } from "zod";
import { linkId, listId, password, token, userId } from "./domainSchema.js";

export const GetLinkRequestSchema = z.object({
  listId: listId,
});

export const LinkResponseSchema = z.object({
  listId: listId,
  linkId: linkId.optional(),
  token: token.optional(),
  hasPassword: z.boolean(),
  createdAt: z.coerce.date().optional(),
  createdBy: userId.optional(),
  updatedAt: z.coerce.date().optional(),
});

export const CreateLinkRequestSchema = GetLinkRequestSchema.extend({
  password: password,
});

export const linkDeleteResponseSchema = z.object({
  success: z.boolean(),
});
