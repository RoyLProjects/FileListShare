import { z } from "zod";
import { pathSchema, teamId, urlSchema } from "./domainSchema.js";

export const DropboxStartRequestSchema = z.object({
  teamId: teamId.optional(),
});

export const DropboxStartResponseSchema = z.object({
  url: urlSchema,
});

export const CallbackOauthRequestSchema = z.object({
  code: z.string(),
  state: z.string(),
});

export const CallbackOauthResponseSchema = z.object({
  url: urlSchema,
});

export const getDropboxBrowseRequestSchema = z.object({
  path: pathSchema.optional(),
  cursor: z.string().optional(),
  teamId: teamId.optional(),
});

export const getDropboxBrowseResponseSchema = z.object({
  entries: z.array(z.any()),
  cursor: z.string().optional(),
  has_more: z.boolean(),
});
