import { logger } from "../../lib/log.js";
import { z } from "zod";
import { getAppPrismaClient } from "../../lib/db.js";
import {
  ForbiddenError,
  InternalServerError,
} from "../../lib/resultHandler.js";
import {
  CreateListDetailsRequestSchema,
  createListDetailsResponseSchema,
  deleteListDetailsResponseSchema,
  DeleteListRequestSchema,
  GetListDetailsRequestSchema,
  ListDetailsResponseSchema,
  UpdateListDetailsRequestSchema,
} from "../../schemas/dashboard/listDetailsSchema.js";

export class ListDetailsService {
  static async getDetails(
    data: z.infer<typeof GetListDetailsRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof ListDetailsResponseSchema>> {
    const prisma = getAppPrismaClient();
    try {
      const page = data.page ?? 1;
      const pageSize = data.pageSize ?? 10;
      const skip = (page - 1) * pageSize;

const list = await prisma.list.findFirst({
  where: {
    id: data.listId,
    OR: [
      { userId: userId },
      { team: { members: { some: { userId: userId } } } },
    ],
  },
  include: {
    items: {
      orderBy: { itemnumber: "desc" },
      skip,
      take: pageSize,
    },
    _count: {
      select: { items: true }, 
    },
  },
});

      if (!list) {
        logger.warn("Forbidden: user has no access to list or list not found");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this list",
        );
      }

      return {
        title: list.title,
        teamId: list.teamId,
        items: list.items.map((it) => ({
          itemId: it.id,
          itemnumber: it.itemnumber,
          listId: it.listId,
          description: it.description,
          uploadedFiles: it.uploadedFiles,
          comment: it.comment,
          status: it.status,
          delivered: it.delivered,
          deadline: it.deadline,
          createdAt: it.createdAt,
          createdBy: it.createdBy,
          updatedAt: it.updatedAt,
        })),
        totalItems: list._count.items ?? 0,
        page,
        pageSize,
      };
    } catch (err) {
      logger.error({ err }, "ListService.getList failed");
      return {
        title: "",
        teamId: null,
        items: [],
        totalItems: 0,
        page: 1,
        pageSize: 10,
      };
    }
  }

  static async createListItem(
    data: z.infer<typeof CreateListDetailsRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof createListDetailsResponseSchema>> {
    const prisma = getAppPrismaClient();

    const list = await prisma.list.findFirst({
      where: {
        id: data.listId,
        OR: [
          { userId: userId },
          { team: { members: { some: { userId: userId } } } },
        ],
      },
      include: {
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
      logger.warn("Forbidden: user has no access to list or list not found");
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

      const canAddItems = teamMember.permissions.some(
        (p) => p.permission === "ITEM_CREATE",
      );
      if (!canAddItems) {
        logger.warn("Forbidden: user lacks ITEM_CREATE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to add items to this list",
        );
      }
    }
      const createdItem = await prisma.list_item.create({
        data: {
          listId: data.listId,
          description: data.description,
          itemnumber: data.itemnumber,
          deadline: data.deadline ? new Date(data.deadline) : new Date(),
          status: data.status,
          createdBy: userId,
        },
      });
      logger.info("List item created successfully");
      return {
        itemId: createdItem.id,
        itemnumber: createdItem.itemnumber,
        listId: createdItem.listId,
        description: createdItem.description,
        uploadedFiles: createdItem.uploadedFiles,
        comment: createdItem.comment,
        status: createdItem.status,
        delivered: createdItem.delivered,
        deadline: createdItem.deadline,
        createdAt: createdItem.createdAt,
        createdBy: createdItem.createdBy,
        updatedAt: createdItem.updatedAt,
      };
  }

  static async updateListItem(
    data: z.infer<typeof UpdateListDetailsRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof createListDetailsResponseSchema>> {
    const prisma = getAppPrismaClient();

    const item = await prisma.list_item.findFirst({
      where: {
        id: data.itemId,
        OR: [
          { list: { userId: userId } },
          { list: { team: { members: { some: { userId: userId } } } } },
        ],
      },
      include: {
        list: {
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
        },
      },
    });

    if (!item || !item.list) {
      logger.warn("Forbidden: user has no access to item or item not found");
      throw new ForbiddenError(
        "Unauthorized: User does not have access to this item",
      );
    }

    // If the list belongs to a team, ensure the user is a member and has ITEM_UPDATE
    if (item.list.teamId) {
      const teamMember = item.list.team?.members.find(
        (m) => m.userId === userId,
      );

      if (!teamMember) {
        logger.warn(
          { userId, itemId: data.itemId, teamId: item.list.teamId },
          "Forbidden: user is not a team member",
        );
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canUpdate = teamMember.permissions.some(
        (p) => p.permission === "ITEM_UPDATE",
      );

      if (!canUpdate) {
        logger.warn("Forbidden: user lacks ITEM_UPDATE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to update items in this team",
        );
      }
    }
    try {
      const updateData: {
        description?: string;
        itemnumber?: number;
        deadline?: Date;
        status?: "published" | "draft" | undefined;
        delivered?: boolean;
      } = {};
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.itemnumber !== undefined)
        updateData.itemnumber = data.itemnumber;
      if (data.deadline !== undefined)
        updateData.deadline = new Date(data.deadline);
      if (data.status !== undefined) updateData.status = data.status;
      if (data.delivered !== undefined) updateData.delivered = data.delivered;

      const updated = await prisma.list_item.update({
        where: { id: data.itemId },
        data: updateData,
      });

      return {
        itemId: updated.id,
        itemnumber: updated.itemnumber,
        listId: updated.listId,
        description: updated.description,
        uploadedFiles: updated.uploadedFiles,
        comment: updated.comment,
        status: updated.status,
        delivered: updated.delivered,
        deadline: updated.deadline,
        createdAt: updated.createdAt,
        createdBy: updated.createdBy,
        updatedAt: updated.updatedAt,
      };
    } catch (e: unknown) {
      logger.error({ err: e }, "updateListItem unexpected error");
      throw new InternalServerError();
    }
  }

  static async deleteItem(
    data: z.infer<typeof DeleteListRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof deleteListDetailsResponseSchema>> {
    const prisma = getAppPrismaClient();

    const item = await prisma.list_item.findFirst({
      where: {
        id: data.itemId,
        OR: [
          { list: { userId: userId } },
          { list: { team: { members: { some: { userId: userId } } } } },
        ],
      },
      include: {
        list: {
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
        },
      },
    });

    if (!item || !item.list) {
      logger.warn("Forbidden: user has no access to item or item not found");
      throw new ForbiddenError(
        "Unauthorized: User does not have access to this item",
      );
    }

    if (item.list.teamId) {
      const teamMember = item.list.team?.members.find(
        (m) => m.userId === userId,
      );

      if (!teamMember) {
        logger.warn(
          { userId, itemId: data.itemId, teamId: item.list.teamId },
          "Forbidden: user is not a team member",
        );
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canDelete = teamMember.permissions.some(
        (p) => p.permission === "ITEM_DELETE",
      );

      if (!canDelete) {
        logger.warn("Forbidden: user lacks ITEM_DELETE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to delete items in this team",
        );
      }
    }

    try {
      await prisma.list_item.delete({ where: { id: data.itemId } });
      return { success: true };
    } catch (e: unknown) {
      logger.error({ err: e }, "deleteList unexpected error");
      throw new InternalServerError();
    }
  }
}
