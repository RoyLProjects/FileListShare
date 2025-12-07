import { logger } from "../../lib/log.js";
import { getAppPrismaClient } from "../../lib/db.js";
import { z } from "zod";
import {
  DeleteTeamMemberRequestSchema,
  DeleteTeamMemberResponseSchema,
  GetTeamMemberRequestSchema,
  GetTeamMemberResponseSchema,
  UpdateTeamMemberRequestSchema,
  UpdateTeamMemberResponseSchema,
} from "../../schemas/dashboard/teamMembersSchema.js";
import {
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} from "../../lib/resultHandler.js";
import { getUserNameById } from "../../lib/auth.js";

export class TeamMemberService {
  static async getTeamMember(
    input: z.infer<typeof GetTeamMemberRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof GetTeamMemberResponseSchema>> {
    const prisma = getAppPrismaClient();
    const userMember = await prisma.teamMember.findFirst({
      where: {
        teamId: input.teamId,
        userId: userId,
      },
    });

    if (!userMember) {
      logger.warn("Team members request: access denied or team not found");
      throw new NotFoundError("Team not found or access denied");
    }

    // Get all team members
    const members = await prisma.teamMember.findMany({
      where: { teamId: input.teamId },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        createdBy: true,
        permissions: {
          select: {
            permission: true,
            teamMemberId: true,
          },
        },
      },
      skip:
        input.page && input.pageSize
          ? (input.page - 1) * input.pageSize
          : undefined,
      take: input.pageSize ?? undefined,
      orderBy: { createdAt: "asc" },
    });

    if (members.length === 0) {
      logger.warn("Team members request: no members found");
      throw new NotFoundError("No team members found");
    }

    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? members.length;
    const total = members.length;

    //better mapping

    const items = await Promise.all(
      members.map(async (m) => ({
        teamMemberId: m.id,
        userName: (await getUserNameById(m.userId)) || "Unknown User",
        createdAt: m.createdAt,
        createdBy: m.createdBy,
        currentMember: Boolean(m.userId === userId),
        permissions: m.permissions.map((p: any) => ({
          teamMemberId: p.teamMemberId,
          permission: p.permission,
        })),
      })),
    );

    return {
      items,
      page,
      pageSize,
      total,
    };
  }

  static async updateTeamMember(
    input: z.infer<typeof UpdateTeamMemberRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof UpdateTeamMemberResponseSchema>> {
    logger.info("Team member update request received");
    const prisma = getAppPrismaClient();
    // Check if user is a member of the team and has permission to modify member rights
    const requestingMember = await prisma.teamMember.findFirst({
      where: {
        teamId: input.teamId,
        userId: userId,
      },
      include: {
        permissions: true,
      },
    });

    if (!requestingMember) {
      logger.warn("Update member request: team not found or access denied");
      throw new NotFoundError("Team not found or access denied");
    }

    const canModifyRights = requestingMember.permissions.some(
      (p) => p.permission === "TEAM_MEMBER_RIGHTS",
    );

    if (!canModifyRights) {
      logger.warn(
        "Update member request: user lacks TEAM_MEMBER_RIGHTS permission",
      );
      throw new ForbiddenError(
        "User does not have permission to modify team member rights",
      );
    }

    // Check if the member to be updated exists in the team
    const memberToUpdate = await prisma.teamMember.findFirst({
      where: {
        id: input.teamMemberId,
        teamId: input.teamId,
      },
      include: {
        permissions: true,
      },
    });

    if (!memberToUpdate) {
      logger.warn("Update member request: member not found");
      throw new NotFoundError("Team member not found in the specified team");
    }

    if (
      memberToUpdate.permissions.some(
        (p) => p.permission === "TEAM_MEMBER_RIGHTS",
      )
    ) {
      if (
        input.permissions.some((perm) => perm === "TEAM_MEMBER_RIGHTS") ===
        false
      ) {
        const teamAdmins = await prisma.teamMember.findMany({
          where: {
            teamId: input.teamId,
            permissions: {
              some: {
                permission: "TEAM_MEMBER_RIGHTS",
              },
            },
            id: {
              not: input.teamMemberId,
            },
          },
        });

        if (teamAdmins.length === 0) {
          logger.warn(
            "Update member request: cannot remove last TEAM_MEMBER_RIGHTS permission",
          );
          throw new ForbiddenError(
            "Cannot remove TEAM_MEMBER_RIGHTS permission from the last team admin",
          );
        }
      }
    }

    // Update permissions in a transaction
    const updatedMember = await prisma.$transaction(async (tx) => {
      // Delete all existing permissions
      await tx.teamMemberPermission.deleteMany({
        where: {
          teamMemberId: input.teamMemberId,
        },
      });

      // Add new permissions
      await tx.teamMemberPermission.createMany({
        data: input.permissions.map((perm) => ({
          teamMemberId: input.teamMemberId,
          permission: perm as any,
        })),
      });

      // Return updated member with permissions
      return tx.teamMember.findUnique({
        where: { id: input.teamMemberId },
        include: {
          permissions: true,
        },
      });
    });

    if (!updatedMember) {
      return { data: null };
    }

    // Build return shape matching schema
    const out = {
      permissions: updatedMember.permissions.map((p: any) => ({
        teamMemberId: p.teamMemberId,
        permission: p.permission,
      })),
      userId: updatedMember.userId,
      createdAt: updatedMember.createdAt,
      id: updatedMember.id,
      createdBy: updatedMember.createdBy,
      teamId: updatedMember.teamId,
    };

    return { data: out };
  }

  static async deleteTeamMember(
    input: z.infer<typeof DeleteTeamMemberRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof DeleteTeamMemberResponseSchema>> {
    const prisma = getAppPrismaClient();

    const requestingMember = await prisma.teamMember.findFirst({
      where: { teamId: input.teamId, userId },
      include: { permissions: true },
    });

    if (!requestingMember) {
      logger.warn("Delete member request: team not found or access denied");
      throw new NotFoundError("Team not found or access denied");
    }

    if (requestingMember.userId === userId) {
      const teamMembers = await prisma.teamMember.findMany({
        where: {
          teamId: input.teamId,
          id: {
            not: input.teamMemberId,
          },
        },
      });

      if (teamMembers.length === 0) {
        logger.warn(
          "Delete member request: cannot delete self as last team member",
        );
        throw new ForbiddenError("Cannot delete self as the last team member");
      }
    }

    const canDelete =
      requestingMember.permissions.some(
        (p) => String(p.permission) === "TEAM_MEMBER_DELETE",
      ) || input.teamMemberId === requestingMember.id;

    if (!canDelete) {
      logger.warn(
        "Delete member request: user lacks TEAM_MEMBER_DELETE permission",
      );
      throw new ForbiddenError(
        "User does not have permission to delete team members",
      );
    }

    const member = await prisma.teamMember.findFirst({
      where: { id: input.teamMemberId, teamId: input.teamId },
    });

    if (!member) {
      logger.warn("Delete member request: member not found");
      throw new NotFoundError("Team member not found in the specified team");
    }

    try {
      await prisma.teamMember.delete({ where: { id: input.teamMemberId } });
      return { success: true };
    } catch (e: unknown) {
      logger.error({ err: e }, "deleteTeamMember unexpected error");
      throw new InternalServerError();
    }
  }
}
