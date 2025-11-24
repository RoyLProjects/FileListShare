import { z } from "zod";
import { page, pageSize, teamId, title, userId } from "./domainSchema.js";

export const GetTeamRequestSchema = z.object({
  page: page,
  pageSize: pageSize,
});

export const teamItemSchema = z.object({
  teamId: teamId,
  title: title,
  createdAt: z.coerce.date(),
  members: z
    .array(
      z.object({
        userId: userId,
      }),
    )
    .optional(),
});

export const GetTeamResponseSchema = z.object({
  items: z.array(teamItemSchema),
  page: page,
  pageSize: pageSize,
  total: z.coerce.number().int().min(0),
});

export const UpdateTeamResponseSchema = teamItemSchema;

export const createTeamRequestSchema = z.object({
  title: title,
});

export const UpdateTeamRequestSchema = z.object({
  teamId: teamId,
  title: title,
});

export const DeleteTeamRequestSchema = z.object({
  teamId: teamId,
});

export const DeleteTeamResponseSchema = z.object({
  success: z.boolean(),
});
