import { z } from "zod";
import {
  listId,
  page,
  pageSize,
  teamId,
  userId,
  title,
} from "./domainSchema.js";

export const GetListRequestSchema = z.object({
  page: page.optional(),
  pageSize: pageSize.optional(),
  teamId: teamId.optional(),
});

const listItemStats = z.object({
  totalItems: z.coerce.number().int().min(0),
  totalDeliveredItems: z.coerce.number().int().min(0),
  totalOverdueItems: z.coerce.number().int().min(0),
  totalComments: z.coerce.number().int().min(0),
});

const listItemSchema = z.object({
  id: listId,
  title: title,
  userId: userId,
  teamId: teamId.optional(),
  teamName: z.string().optional(),
  stats: listItemStats.optional(),
});

const listStatsSchema = z.object({
  totalOfItems: z.coerce.number().int().min(0),
  totalOfDeliveredItems: z.coerce.number().int().min(0),
  totalOfOverdueItems: z.coerce.number().int().min(0),
  totalOfLists: z.coerce.number().int().min(0),
});

export const ListResponseSchema = z.object({
  Items: z.array(listItemSchema),
  page: page,
  pageSize: pageSize,
  stats: listStatsSchema.optional(),
});




export const CreateListRequestSchema = z.object({
  title: title,
  teamId: teamId.optional(),
});

export const CreatedListResponseSchema = listItemSchema;

export const UpdateListRequestSchema = CreateListRequestSchema.extend({
  listId: listId,
});

export const DeleteListRequestSchema = z.object({
  listId: listId,
});

export const DeleteListResponseSchema = z.object({
  success: z.boolean(),
});
