import { logger } from "../../lib/log.js";
import { z } from "zod";
import {
  CreatedListResponseSchema,
  CreateListRequestSchema,
  DeleteListRequestSchema,
  DeleteListResponseSchema,
  GetListRequestSchema,
  ListResponseSchema,
  UpdateListRequestSchema,
} from "../../schemas/dashboard/listSchema.js";
import { getAppPrismaClient } from "../../lib/db.js";
import {
  ForbiddenError,
  InternalServerError,
} from "../../lib/resultHandler.js";

export class ListService {
  static async getList(
    data: z.infer<typeof GetListRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof ListResponseSchema>> {
    const prisma = getAppPrismaClient();
      const where: any = {};

      if (data.teamId) {
        where.teamId = data.teamId;
        where.AND = [
          {
            OR: [
              { userId: userId },
              { team: { members: { some: { userId: userId } } } },
            ],
          },
        ];
      } else {
        where.OR = [
          { userId: userId },
          { team: { members: { some: { userId: userId } } } },
        ];
      }

const [lists, totalCount] = await prisma.$transaction([
  prisma.list.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip:
      data.page && data.pageSize
        ? (data.page - 1) * data.pageSize
        : undefined,
    take: data.pageSize ?? undefined,
    select: {
      id: true,
      title: true,
      userId: true,
      createdBy: true,
      teamId: true,
      team: {
        select: {
          title: true,
        },
      },
      items: {
        select: {
          id: true,
          delivered: true,
          deadline: true,
        },
      },
    },
  }),

  prisma.list.count({
    where, // same filter as findMany
  }),
]);


const Items = lists.map((list) => {
        type ItemType = { delivered?: boolean; deadline?: Date };
        const items = (list as unknown as { items?: ItemType[] }).items;

        const totalItems = items?.length ?? 0;
        const totalDeliveredItems =
          items?.filter((i) => i.delivered).length ?? 0;
        const totalOverdueItems =
          items?.filter(
            (i) => !i.delivered && i.deadline && i.deadline < new Date(),
          ).length ?? 0;
        const totalComments =
          items?.filter(
            (i) => i && (i as any).comment && (i as any).comment.trim(),
          ).length ?? 0;

        return {
          id: list.id,
          title: list.title,
          // schema requires `userId` to always be present; fall back to `createdBy` when missing
          userId: list.userId ?? list.createdBy,
          ...(list.teamId ? { teamId: list.teamId } : {}),
          ...(list.team?.title ? { teamName: list.team.title } : {}),
          stats: {
            totalItems,
            totalDeliveredItems,
            totalOverdueItems,
            totalComments,
          },
        };
      });

      const totalOfItems = Items.reduce(
        (acc, l) => acc + (l.stats?.totalItems ?? 0),
        0,
      );
      const totalOfDeliveredItems = Items.reduce(
        (acc, l) => acc + (l.stats?.totalDeliveredItems ?? 0),
        0,
      );
      const totalOfOverdueItems = Items.reduce(
        (acc, l) => acc + (l.stats?.totalOverdueItems ?? 0),
        0,
      );
      const totalOfLists = totalCount ?? 0;

      const page = data.page ?? 1;
      const pageSize = data.pageSize ?? Math.max(1, lists.length);

      return {
        Items,
        page,
        pageSize,
        stats: {
          totalOfItems,
          totalOfDeliveredItems,
          totalOfOverdueItems,
          totalOfLists,
        },
      };
  }

  static async createList(
    data: z.infer<typeof CreateListRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof CreatedListResponseSchema>> {
    const prisma = getAppPrismaClient();

    if (data.teamId) {
      // verify the user is a team member
      const teamMember = await prisma.teamMember.findFirst({
        where: {
          teamId: data.teamId,
          userId: userId,
        },
        include: {
          permissions: true,
        },
      });
      if (!teamMember) {
        logger.warn(
          "List create request: user is not a member of the target team",
        );
        throw new ForbiddenError("User is not a member of the target team");
      }
      const canAddList = teamMember?.permissions.some(
        (p) => p.permission === "LIST_CREATE",
      );
      if (!canAddList) {
        logger.warn(
          "User does not have permission to create lists in this team",
        );
        throw new ForbiddenError(
          "User does not have permission to create lists in this team",
        );
      }

      const newList = await prisma.list.create({
        data: {
          title: data.title as unknown as string,
          teamId: data.teamId,
          createdBy: userId,
        },
      });
      logger.info("Team list created successfully");
      return {
        id: newList.id,
        title: newList.title,
        // ensure `userId` is provided to satisfy the zod schema (use the requesting user)
        userId: userId,
        teamId: newList.teamId ?? undefined,
      };
    } else {
      // Resolve the internal User.id from the external userId value

      const newList = await prisma.list.create({
        data: {
          title: data.title as unknown as string,
          userId: userId,
          createdBy: userId,
        },
      });
      logger.info("Personal list created successfully");
      return {
        id: newList.id,
        title: newList.title,
        userId: newList.userId ?? userId,
      };
    }
  }

  static async updateList(
    data: z.infer<typeof UpdateListRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof CreatedListResponseSchema>> {
    const prisma = getAppPrismaClient();

    const list = await prisma.list.findFirst({
      where: {
        id: data.listId,
        OR: [
          { user: { id: userId } },
          { team: { members: { some: { userId: userId } } } },
        ],
      },
      include: {
        user: { include: { storage: true } },
        team: {
          include: {
            storage: true,
            members: {
              where: { userId: userId },
              include: { permissions: true },
            },
          },
        },
      },
    });

    if (!list) {
      logger.warn("Forbidden: user has no access to list");
      throw new ForbiddenError(
        "Unauthorized: User does not have access to this list",
      );
    }

    if (list.teamId) {
      const teamMember = list.team?.members.find((m) => m.userId === userId);

      if (!teamMember) {
        logger.warn(
          { userId, listId: data.listId, teamId: list.teamId },
          "Forbidden: user is not a team member",
        );
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canRename = teamMember.permissions.some(
        (p) => p.permission === "LIST_RENAME",
      );

      if (!canRename && data.title !== undefined) {
        logger.warn("Forbidden: user lacks LIST_RENAME permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to rename lists in this team",
        );
      }
    }

    try {
      const updateData: { title?: string } = {};
      if (data.title !== undefined)
        updateData.title = data.title as unknown as string;

      const updated = await prisma.list.update({
        where: { id: data.listId },
        data: updateData,
      });

      return {
        id: updated.id,
        title: updated.title,
        // `userId` must always be present for the schema; fall back to `createdBy` when needed
        userId: (updated.userId ?? updated.createdBy) as unknown as string,
        teamId: updated.teamId ?? undefined,
      };
    } catch (e: unknown) {
      logger.error({ err: e }, "updateList unexpected error");
      throw new InternalServerError();
    }
  }

  static async deleteList(
    data: z.infer<typeof DeleteListRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof DeleteListResponseSchema>> {
    const prisma = getAppPrismaClient();

    const list = await prisma.list.findFirst({
      where: {
        id: data.listId,
        OR: [
          { user: { id: userId } },
          { team: { members: { some: { userId: userId } } } },
        ],
      },
      include: {
        user: true,
        team: {
          include: {
            members: {
              where: { userId: userId },
              include: { permissions: true },
            },
          },
        },
      },
    });

    if (!list) {
      logger.warn("Forbidden: user has no access to list");
      throw new ForbiddenError(
        "Unauthorized: User does not have access to this list",
      );
    }

    if (list.teamId) {
      const teamMember = list.team?.members.find((m) => m.userId === userId);

      if (!teamMember) {
        logger.warn("Forbidden: user is not a team member");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canDelete = teamMember.permissions.some(
        (p) => p.permission === "LIST_DELETE",
      );

      if (!canDelete) {
        logger.warn("Forbidden: user lacks LIST_DELETE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to delete lists in this team",
        );
      }
    }

    try {
      await prisma.list.delete({ where: { id: data.listId } });
      return { success: true };
    } catch (e: unknown) {
      logger.error({ err: e }, "deleteList unexpected error");
      throw new InternalServerError();
    }
  }
}
