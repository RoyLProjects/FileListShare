import { z } from "zod";
import { pathSchema, storageId, teamId } from "./domainSchema.js";

export const GetStorageRequestSchema = z.object({
  teamId: teamId.optional(),
});

export const storageItemSchema = z.object({
  id: storageId.nullable(),
  type: z.enum(["dropbox"]).nullable(),
  displayName: z.string().nullable(),
  storagePath: pathSchema.nullable(),
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
