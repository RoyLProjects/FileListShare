import { z } from "zod";
import {
  comment,
  fileName,
  fileSize,
  itemId,
  listId,
  token,
} from "../dashboard/domainSchema.js";

export const MarkDeliveredRequestSchema = z.object({
  token: token,
  itemId: itemId,
  delivered: z.boolean(),
});

export const ResponseSchema = z.object({
  success: z.boolean(),
});

export const addCommentRequestSchema = z.object({
  token: token,
  itemId: itemId,
  comment: comment,
});

export const uploadUrlRequestSchema = z.object({
  token: token,
  listId: listId,
  itemId: itemId,
  fileName: fileName,
  fileSize: fileSize,
});

export const uploadUrlResponseSchema = z.object({
  uploadUrl: z.string().url(),
  fileName: fileName,
});

export const addUploadedFileRequestSchema = z.object({
  token: token,
  itemId: itemId,
  fileName: fileName,
});
