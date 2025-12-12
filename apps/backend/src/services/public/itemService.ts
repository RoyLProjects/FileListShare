import { getAppPrismaClient } from "../../lib/db.js";
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "../../lib/resultHandler.js";
import {
  GetItemsRequestSchema,
  GetItemsResponseSchema,
} from "../../schemas/public/itemSchema.js";
import { logger } from "../../lib/log.js";
import { z } from "zod";
import { getUserNameById } from "../../lib/auth.js";

export class ItemService {
  static async getItems(
    input: z.infer<typeof GetItemsRequestSchema>,
    listId: string,
    token: string,
  ): Promise<z.infer<typeof GetItemsResponseSchema>> {
    if (!input.token || !token || input.token !== token) {
      logger.warn("Invalid token provided for fetching items");
      throw new UnauthorizedError("Invalid token");
    }

    const prisma = getAppPrismaClient();

    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: {
        items: {
          where: {
            status: "published",
          },
          orderBy: {
            itemnumber: "asc",
          },
        },
      },
    });
    if (!list) {
      logger.error(
        "List not found for the provided list ID when fetching items",
      );
      throw new InternalServerError("List not found");
    }
    let createdByUser;
    if(list.createdBy != null) {
      const user = await getUserNameById(list.createdBy);
      createdByUser = user ? user : "Unknown";
    } else {
      createdByUser = "Unknown";
    }

    const responseData = {
      listId: list.id,
      title: list.title,
      items: list.items.map((item) => ({
        itemId: item.id,
        itemnumber: item.itemnumber,
        description: item.description,
        uploadedFiles: item.uploadedFiles,
        comment: item.comment,
        status: item.status,
        delivered: item.delivered,
        deadline: item.deadline,
        createdBy: createdByUser,
      })),
    };

    logger.info("Public items served successfully");
    return responseData;
  }
}
