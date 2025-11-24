import { z } from "zod";

export const validPermissions = [
  "LIST_CREATE",
  "LIST_RENAME",
  "LIST_DELETE",
  "ITEM_CREATE",
  "ITEM_UPDATE",
  "ITEM_DELETE",
  "TEAM_RENAME",
  "TEAM_DELETE",
  "TEAM_MEMBER_CREATE",
  "TEAM_MEMBER_DELETE",
  "TEAM_MEMBER_RIGHTS",
  "TEAM_STORAGE_ADD",
  "TEAM_STORAGE_UPDATE",
  "TEAM_STORAGE_DELETE",
  "TEAM_PUBLIC_LINK_CREATE",
  "TEAM_PUBLIC_LINK_DELETE",
] as const;

export const validPermissionsEnum = z.enum(
  validPermissions as unknown as [string, ...string[]],
);

export const permissionSchema = z.object({
  permissions: z.array(validPermissionsEnum).optional().default([]),
});

export type Permission = z.infer<typeof validPermissionsEnum>;

export default permissionSchema;
