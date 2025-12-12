import { z } from "zod";
import {
  page,
  pageSize,
  teamId,
  teamMemberId,
  userName,
  userId,
} from "./domainSchema.js";
import { validPermissionsEnum } from "./permissionSchema.js";

export const GetTeamMemberRequestSchema = z.object({
  teamId: teamId,
  page: page.optional(),
  pageSize: pageSize.optional(),
});

export const GetTeamMemberItemSchema = z.object({
  teamMemberId: teamMemberId,
  userName: userName,
  createdAt: z.coerce.date(),
  createdBy: userId,
  currentMember: z.boolean(),
  permissions: z.array(
    z.object({
      teamMemberId: teamMemberId,
      permission: validPermissionsEnum,
    }),
  ),
});

export const GetTeamMemberResponseSchema = z.object({
  items: z.array(GetTeamMemberItemSchema),
  page: page,
  pageSize: pageSize,
  total: z.coerce.number().nonnegative(),
});

export const UpdateTeamMemberRequestSchema = z.object({
  teamId: teamId,
  teamMemberId: teamMemberId,
  permissions: z.array(validPermissionsEnum),
});

export const UpdateTeamMemberResponseSchema = z.object({
  data: z.union([
    z.null(),
    z.object({
      permissions: z.array(
        z.object({
          teamMemberId: teamMemberId,
          permission: validPermissionsEnum,
        }),
      ),
      userId: userId,
      createdAt: z.coerce.date(),
      id: teamMemberId,
      teamId: teamId,
    }),
  ]),
});

export const DeleteTeamMemberRequestSchema = z.object({
  teamMemberId: teamMemberId,
  teamId: teamId,
});

export const DeleteTeamMemberResponseSchema = z.object({
  success: z.boolean(),
});
