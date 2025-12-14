import { getAppPrismaClient } from "../../lib/db.js";
import {
  createTeamRequestSchema,
  DeleteTeamRequestSchema,
  DeleteTeamResponseSchema,
  GetTeamRequestSchema,
  GetTeamResponseSchema,
  UpdateTeamRequestSchema,
  UpdateTeamResponseSchema,
} from "../../schemas/dashboard/teamSchema.js";
import { logger } from "../../lib/log.js";
import { z } from "zod";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../lib/resultHandler.js";
import { validPermissions } from "../../schemas/dashboard/permissionSchema.js";
import { getUserNameById } from "../../lib/auth.js";

export class TeamService {
  static async getTeam(
    input: z.infer<typeof GetTeamRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof GetTeamResponseSchema>> {
    const where = {
      members: { some: { userId: userId } },
    };
    const prisma = getAppPrismaClient();
    const [total, items] = await Promise.all([
      prisma.team.count({ where }),
      prisma.team.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (input.page - 1) * input.pageSize,
        take: input.pageSize,
        select: {
          id: true,
          title: true,
          createdAt: true,
          members: { select: { userId: true } },
        },
      }),
    ]);

    const outItems = await Promise.all(
      items.map(async (t) => ({
        teamId: t.id,
        title: t.title,
        createdAt: t.createdAt,
        members: await Promise.all(
          t.members?.map(async (m) => ({
            userName: (await getUserNameById(m.userId)) || "unknown user",
          })) || [],
        ),
      })),
    );

    return {
      items: outItems,
      page: input.page,
      pageSize: input.pageSize,
      total,
    };
  }

  static async createTeam(
    input: z.infer<typeof createTeamRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof UpdateTeamResponseSchema>> {
    const prisma = getAppPrismaClient();
    const newTeam = await prisma.$transaction(async (tx) => {
      // Create the team
      const team = await tx.team.create({
        data: {
          title: input.title,
          createdBy: userId,
        },
      });

      // Create team member for the creator
      const teamMember = await tx.teamMember.create({
        data: {
          teamId: team.id,
          userId: userId,
          createdBy: userId,
        },
      });

      // Grant all permissions to the creator
      const allPermissions = validPermissions;

      await tx.teamMemberPermission.createMany({
        data: allPermissions.map((permission) => ({
          teamMemberId: teamMember.id,
          permission: permission,
        })),
      });

      // Return the team with member and permissions included
      return tx.team.findUnique({
        where: { id: team.id },
        include: {
          members: {
            include: {
              permissions: true,
            },
          },
        },
      });
    });

    logger.info("Team created successfully");

    return {
      teamId: newTeam!.id,
      title: newTeam!.title,
      createdAt: newTeam!.createdAt,
      members: await Promise.all(
        newTeam!.members?.map(async (m) => ({
          userName: (await getUserNameById(m.userId)) || "unknown user",
        })) || [],
      ),
    };
  }

  static async updateTeam(
    input: z.infer<typeof UpdateTeamRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof UpdateTeamResponseSchema>> {
    const prisma = getAppPrismaClient();
    const teamMember = await prisma.teamMember.findFirst({
      where: {
        teamId: input.teamId,
        userId: userId,
      },
      include: {
        team: true,
        permissions: true,
      },
    });

    if (!teamMember) {
      logger.warn(
        { userId, teamId: input.teamId },
        "User is not a member of the team",
      );
      throw new NotFoundError("User is not a member of the team");
    }
    const canRename = teamMember.permissions.some(
      (p) => p.permission === "TEAM_RENAME",
    );
    if (!canRename) {
      logger.warn(
        { userId, teamId: input.teamId },
        "User lacks TEAM_RENAME permission",
      );
      throw new ForbiddenError("User lacks permission to rename the team");
    }
    const existingTeam = await prisma.team.findFirst({
      where: {
        title: input.title,
        NOT: { id: input.teamId },
      },
    });
    if (existingTeam) {
      logger.warn(
        { userId, teamId: input.teamId, title: input.title },
        "Team title already in use",
      );
      throw new ConflictError("Team title already in use");
    }
    const updatedTeam = await prisma.team.update({
      where: { id: input.teamId },
      data: { title: input.title },
      include: {
        members: {
          include: {
            permissions: true,
          },
        },
      },
    });
    logger.info({ teamId: input.teamId }, "Team updated successfully");

    return {
      teamId: updatedTeam.id,
      title: updatedTeam.title,
      createdAt: updatedTeam.createdAt,
      members: await Promise.all(
        updatedTeam.members?.map(async (m) => ({
          userName: (await getUserNameById(m.userId)) || "unknown user",
        })) || [],
      ),
    };
  }

  static async deleteTeam(
    input: z.infer<typeof DeleteTeamRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof DeleteTeamResponseSchema>> {
    const prisma = getAppPrismaClient();

    const teamMember = await prisma.teamMember.findFirst({
      where: {
        teamId: input.teamId,
        userId: userId,
      },
      include: {
        team: true,
        permissions: true,
      },
    });
    if (!teamMember) {
      logger.warn(
        { userId, teamId: input.teamId },
        "User is not a member of the team",
      );
      throw new NotFoundError("User is not a member of the team");
    }
    const canDelete = teamMember.permissions.some(
      (p) => p.permission === "TEAM_DELETE",
    );
    if (!canDelete) {
      logger.warn(
        { userId, teamId: input.teamId },
        "User lacks TEAM_DELETE permission",
      );
      throw new ForbiddenError("User lacks permission to delete the team");
    }
    await prisma.team.delete({
      where: { id: input.teamId },
    });
    logger.info({ teamId: input.teamId }, "Team deleted successfully");
    return { success: true };
  }
}
