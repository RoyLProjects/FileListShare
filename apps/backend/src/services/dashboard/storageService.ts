import { getAppPrismaClient } from "../../lib/db.js";
import { z } from "zod";
import {
  DeleteStorageRequestSchema,
  DeleteStorageResponseSchema,
  GetStorageRequestSchema,
  GetStorageResponseSchema,
  UpdateStorageRequestSchema,
} from "../../schemas/dashboard/storageSchema.js";
import { logger } from "../../lib/log.js";
import {
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} from "../../lib/resultHandler.js";

export class StorageService {
  static async getStorage(
    input: z.infer<typeof GetStorageRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof GetStorageResponseSchema>> {
    const prisma = getAppPrismaClient();
    const where = input.teamId
      ? { teamId: input.teamId }
      : { user: { id: userId } };

    try {
      const storages = await prisma.storage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          displayName: true,
          storagePath: true,
          userId: true,
          teamId: true,
        },
      });

      const items = storages.map((s) => ({
        id: s.id,
        type: s.type,
        displayName: s.displayName,
        storagePath: s.storagePath ?? "",
      }));

      logger.info("Storage list served successfully");

      return { items };
    } catch (e: unknown) {
      logger.error({ err: e }, "StorageService.getStorage failed");
      throw new InternalServerError();
    }
  }

  static async updateStorage(
    input: z.infer<typeof UpdateStorageRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof GetStorageResponseSchema>> {
    const prisma = getAppPrismaClient();

    const storage = await prisma.storage.findFirst({
      where: {
        id: input.storageId,
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

    if (!storage) {
      logger.warn("Storage not found or user has no access");
      throw new NotFoundError("Storage item not found");
    }

    // If team storage, verify permissions
    if (storage.teamId) {
      const teamMember = storage.team?.members.find((m) => m.userId === userId);
      if (!teamMember) {
        logger.warn("Forbidden: user is not a team member");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canUpdate = teamMember.permissions.some(
        (p) => String(p.permission) === "TEAM_STORAGE_UPDATE",
      );

      if (!canUpdate) {
        logger.warn("Forbidden: user lacks TEAM_STORAGE_UPDATE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to update team storage",
        );
      }
    } else {
      if (storage.user?.id !== userId) {
        logger.warn("Forbidden: user is not the owner of this storage");
        throw new ForbiddenError(
          "Unauthorized: User does not own this storage",
        );
      }
    }

    try {
      const updated = await prisma.storage.update({
        where: { id: input.storageId },
        data: { storagePath: input.storagePath },
        select: { id: true, type: true, displayName: true, storagePath: true },
      });

      const item = {
        id: updated.id,
        type: updated.type,
        displayName: updated.displayName,
        storagePath: updated.storagePath ?? "",
      };

      return {
        items: [item]
      };
    } catch (e: unknown) {
      logger.error({ err: e }, "updateStorage unexpected error");
      throw new InternalServerError();
    }
  }

  static async deleteStorage(
    input: z.infer<typeof DeleteStorageRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof DeleteStorageResponseSchema>> {
    const prisma = getAppPrismaClient();

    const storage = await prisma.storage.findFirst({
      where: {
        id: input.storageId,
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

    if (!storage) {
      logger.warn("Storage not found or user has no access");
      throw new NotFoundError("Storage item not found");
    }

    if (storage.teamId) {
      const teamMember = storage.team?.members.find((m) => m.userId === userId);
      if (!teamMember) {
        logger.warn("Forbidden: user is not a team member");
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canDelete = teamMember.permissions.some(
        (p) => String(p.permission) === "TEAM_STORAGE_DELETE",
      );

      if (!canDelete) {
        logger.warn("Forbidden: user lacks TEAM_STORAGE_DELETE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to delete team storage",
        );
      }
    } else {
      if (storage.user?.id !== userId) {
        logger.warn("Forbidden: user is not the owner of this storage");
        throw new ForbiddenError(
          "Unauthorized: User does not own this storage",
        );
      }
    }

    try {
      await prisma.storage.delete({ where: { id: input.storageId } });
      return { success: true };
    } catch (e: unknown) {
      logger.error({ err: e }, "deleteStorage unexpected error");
      throw new InternalServerError();
    }
  }
}
