import { z } from "zod";
import {
  comment,
  description,
  itemId,
  itemnumber,
  itemstatus,
  listId,
  token,
  userId,
  title,
} from "../dashboard/domainSchema.js";

export const GetItemsRequestSchema = z.object({
  token: token,
});

export const publicListItemSchema = z.object({
  itemId: itemId,
  itemnumber: itemnumber,
  description: description,
  uploadedFiles: z.array(z.string()),
  comment: comment,
  status: itemstatus,
  delivered: z.boolean(),
  deadline: z.coerce.date().nullable(),
  createdBy: userId,
});

export const GetItemsResponseSchema = z.object({
  listId: listId,
  title: title,
  items: z.array(publicListItemSchema),
});
