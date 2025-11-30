import { getAppPrismaClient } from "../../lib/db.js";
import { ConflictError, ForbiddenError } from "../../lib/resultHandler.js";
import {
  CreateLinkRequestSchema,
  GetLinkRequestSchema,
  LinkResponseSchema,
  linkDeleteResponseSchema,
} from "../../schemas/dashboard/linkSchemas.js";
import { customAlphabet } from "nanoid";
import argon2 from "argon2";
import { logger } from "../../lib/log.js";
import { z } from "zod";

export class LinkService {
  static alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  static nanoid = customAlphabet(this.alphabet, 7);

  static async getLink(
    data: z.infer<typeof GetLinkRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof LinkResponseSchema>> {
    const prisma = getAppPrismaClient();

    const listId = data.listId;

    let result = await prisma.publicLink.findFirst({
      where: {
        listId: listId,
        OR: [
          { list: { user: { id: userId } } },
          { list: { team: { members: { some: { userId: userId } } } } },
        ],
      },
      include: {
        list: {
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
        },
      },
    });

    const linkId = result?.id;
    const token = result?.token;
    const hasPassword = Boolean(result?.passwordHash);

    return {
      listId: listId,
      linkId: linkId,
      token: token,
      hasPassword: hasPassword,
      createdAt: result?.createdAt ?? undefined,
      createdBy: result?.createdBy ?? undefined,
      updatedAt: result?.updatedAt ?? undefined,
    };
  }

  static async createLink(
    data: z.infer<typeof CreateLinkRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof LinkResponseSchema>> {
    const prisma = getAppPrismaClient();
    const listId = data.listId;
    const password = data.password;

    //todo test what info is extracted here
    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        OR: [
          { user: { id: userId } },
          { team: { members: { some: { userId: userId } } } },
        ],
      },
      include: {
        user: {
          include: { storage: true },
        },
        team: {
          include: {
            storage: true,
            members: {
              where: { userId: userId },
              include: {
                permissions: true,
              },
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

      const canCreate = teamMember.permissions.some(
        (p) => p.permission === "TEAM_PUBLIC_LINK_CREATE",
      );

      if (!canCreate) {
        logger.warn("Forbidden: user lacks TEAM_PUBLIC_LINK_CREATE permission");
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to create public links for this team",
        );
      }
    }

    const storage = list.teamId ? list.team?.storage : list.user?.storage;
    if (!storage) {
      logger.warn(
        "Cannot create public link for list without storage configured",
      );
      throw new ConflictError(
        "Cannot create public link for list without storage configured",
      );
    }

    const existing = await prisma.publicLink.findUnique({
      where: { listId: listId },
    });

    if (existing) {
      logger.warn("Public link already exists for this list");
      throw new ConflictError("Public link already exists for this list");
    }

    let passwordHash: string | null = null;

    if (password && password != null && password.length > 0) {
      passwordHash = await argon2.hash(password);
    }

    while (true) {
      const slug = this.nanoid();

      var creation = await prisma.publicLink.create({
        data: {
          listId: listId,
          token: slug,
          passwordHash: passwordHash,
          createdBy: userId,
        },
      });

      return {
        listId: creation.listId,
        linkId: creation.id,
        token: creation.token,
        hasPassword: Boolean(creation.passwordHash),
        createdAt: creation.createdAt ?? undefined,
        createdBy: creation.createdBy,
        updatedAt: creation.updatedAt ?? undefined,
      };
    }
  }

  static async deleteLink(
    data: z.infer<typeof GetLinkRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof linkDeleteResponseSchema>> {
    const prisma = getAppPrismaClient();

    const listId = data.listId;

    //todo test what info is extracted here
    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        OR: [
          { user: { id: userId } },
          { team: { members: { some: { userId: userId } } } },
        ],
      },
      include: {
        user: {
          include: { storage: true },
        },
        team: {
          include: {
            storage: true,
            members: {
              where: { userId: userId },
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    });
    if (!list) {
      logger.warn({ userId, listId }, "Forbidden: user has no access to list");
      throw new ForbiddenError(
        "Unauthorized: User does not have access to this list",
      );
    }

    if (list.teamId) {
      const teamMember = list.team?.members.find((m) => m.userId === userId);

      if (!teamMember) {
        logger.warn(
          { userId, listId, teamId: list.teamId },
          "Forbidden: user is not a team member",
        );
        throw new ForbiddenError(
          "Unauthorized: User does not have access to this team",
        );
      }

      const canDelete = teamMember.permissions.some(
        (p) => p.permission === "TEAM_PUBLIC_LINK_DELETE",
      );

      if (!canDelete) {
        logger.warn(
          { userId, listId, teamId: list.teamId },
          "Forbidden: user lacks TEAM_PUBLIC_LINK_DELETE permission",
        );
        throw new ForbiddenError(
          "Unauthorized: User does not have permission to delete public links for this team",
        );
      }
    }
    await prisma.publicLink.delete({
      where: { listId: listId },
    });
    return {
      success: true,
    };
  }
}
