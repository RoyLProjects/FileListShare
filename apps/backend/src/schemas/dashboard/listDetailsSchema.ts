import { z } from "zod";
import {
  comment,
  description,
  itemId,
  itemnumber,
  itemstatus,
  listId,
  page,
  pageSize,
  teamId,
  title,
} from "./domainSchema.js";

export const GetListDetailsRequestSchema = z.object({
  listId: listId,
  page: page.optional(),
  pageSize: pageSize.optional(),
});

const listItemDetailSchema = z.object({
  itemId: itemId,
  itemnumber: itemnumber,
  listId: listId,
  description: description,
  uploadedFiles: z.array(z.string()),
  comment: comment.optional(),
  status: itemstatus,
  delivered: z.boolean(),
  deadline: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  createdBy: z.string(),
  updatedAt: z.coerce.date(),
});

export const ListDetailsResponseSchema = z.object({
  title: title,
  teamId: teamId.nullable(),
  items: z.array(listItemDetailSchema),
  totalItems: z.number().int(),
  page: page,
  pageSize: pageSize,
});

export const CreateListDetailsRequestSchema = z.object({
  listId: listId,
  description: description,
  itemnumber: itemnumber,
  deadline: z.string().datetime().optional(),
  status: itemstatus,
});

export const createListDetailsResponseSchema = z.object({
  itemId: itemId,
  itemnumber: itemnumber,
  listId: listId,
  description: description,
  uploadedFiles: z.array(z.string()),
  comment: comment.optional(),
  status: itemstatus,
  delivered: z.boolean(),
  deadline: z.coerce.date().nullable(),
});

export const UpdateListDetailsRequestSchema = z.object({
  itemId: itemId,
  description: description.optional(),
  itemnumber: itemnumber.optional(),
  deadline: z.string().optional(),
  delivered: z.boolean().optional(),
  status: itemstatus.optional(),
});

export const DeleteListRequestSchema = z.object({
  itemId: itemId,
});

export const deleteListDetailsResponseSchema = z.object({
  success: z.boolean(),
});
