import { z } from "zod";
import { pathSchema, storageId, teamId } from "./domainSchema.js";

export const GetStorageRequestSchema = z.object({
  teamId: teamId.optional(),
});

export const storageItemSchema = z.object({
  id: storageId,
  type: z.enum(["dropbox"]),
  displayName: z.string(),
  storagePath: pathSchema,
});

export const GetStorageResponseSchema = storageItemSchema;

export const UpdateStorageRequestSchema = z.object({
  storageId: storageId,
  storagePath: pathSchema,
});

export const DeleteStorageRequestSchema = z.object({
  storageId: storageId,
});

export const DeleteStorageResponseSchema = z.object({
  success: z.boolean(),
});
