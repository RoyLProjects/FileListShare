import { z } from "zod";
import { getAppPrismaClient } from "../../lib/db.js";
import { logger } from "../../lib/log.js";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../lib/resultHandler.js";
import {
  addCommentRequestSchema,
  addUploadedFileRequestSchema,
  MarkDeliveredRequestSchema,
  ResponseSchema,
  uploadUrlRequestSchema,
  uploadUrlResponseSchema,
} from "../../schemas/public/actionSchema.js";
import { getDropboxUploadLink } from "../../lib/dropboxUntils.js";
import buildUploadPath from "../../lib/buildUploadPath.js";

export class ActionService {
  static async markDelivered(
    input: z.infer<typeof MarkDeliveredRequestSchema>,
    listId: string,
    token: string,
  ): Promise<z.infer<typeof ResponseSchema>> {
    if (!input.token || !token || input.token !== token) {
      logger.warn("Invalid token provided for fetching items");
      throw new ForbiddenError("Invalid token");
    }

    const prisma = getAppPrismaClient();
    const item = await prisma.list_item.findUnique({
      where: { id: input.itemId },
      include: { list: true },
    });

    if (!item || item.listId !== listId) {
      logger.warn(
        "List item not found or does not belong to the specified list",
      );
      throw new NotFoundError("List item not found");
    }

    await prisma.list_item.update({
      where: { id: input.itemId },
      data: { delivered: input.delivered },
    });

    logger.info("List item marked as delivered successfully");
    return { success: true };
  }

  static MAX_PATH_LENGTH = 240;
  static async addComment(
    input: z.infer<typeof addCommentRequestSchema>,
    listId: string,
    token: string,
  ): Promise<z.infer<typeof ResponseSchema>> {
    if (!input.token || !token || input.token !== token) {
      logger.warn("Invalid token provided for fetching items");
      throw new ForbiddenError("Invalid token");
    }

    const prisma = getAppPrismaClient();
    const item = await prisma.list_item.findUnique({
      where: { id: input.itemId },
      include: { list: true },
    });

    if (!item || item.listId !== listId) {
      logger.warn(
        "List item not found or does not belong to the specified list",
      );
      throw new NotFoundError("List item not found");
    }

    await prisma.list_item.update({
      where: { id: input.itemId },
      data: { comment: input.comment },
    });

    logger.info("List item marked as delivered successfully");
    return { success: true };
  }
  static async uploadUrl(
    input: z.infer<typeof uploadUrlRequestSchema>,
    listId: string,
    token: string,
  ): Promise<z.infer<typeof uploadUrlResponseSchema>> {
    if (!input.token || !token || input.token !== token) {
      logger.warn("Invalid token provided for fetching items");
      throw new ForbiddenError("Invalid token");
    }

    const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB in bytes
    if (input.fileSize > MAX_FILE_SIZE) {
      logger.warn("Public action: upload-url file size exceeds limit");
      throw new ConflictError("File size exceeds the maximum limit");
    }

    const prisma = getAppPrismaClient();
    const item = await prisma.list_item.findUnique({
      where: { id: input.itemId },
      include: {
        list: {
          include: {
            user: { include: { storage: true } },
            team: { include: { storage: true } },
          },
        },
      },
    });

    if (!item || item.listId !== listId) {
      logger.warn(
        "List item not found or does not belong to the specified list",
      );
      throw new NotFoundError("List item not found");
    }

    const storage = item.list.user?.storage || item.list.team?.storage;
    if (!storage) {
      logger.error("No storage configured for user or team");
      throw new ConflictError("No storage configured");
    }
    if (storage.type !== "dropbox") {
      logger.warn("Public action: upload-url unsupported storage type");
      throw new ConflictError("Unsupported storage type");
    }

const now = new Date();
const uploadDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    const uploadPath = buildUploadPath(storage.storagePath || "", item.itemnumber, item.list.title, input.fileName, uploadDate);



    const uploadUrl = await getDropboxUploadLink(
      storage.refreshToken,
      uploadPath,
      14400, // 4 hours
    );
    logger.info("Generated upload URL successfully");
    return { uploadUrl, fileName: input.fileName };
  }
  static async addUploadedFile(
    input: z.infer<typeof addUploadedFileRequestSchema>,
    listId: string,
    token: string,
  ): Promise<z.infer<typeof ResponseSchema>> {
    if (!input.token || !token || input.token !== token) {
      logger.warn("Invalid token provided for fetching items");
      throw new ForbiddenError("Invalid token");
    }

    const prisma = getAppPrismaClient();
    const item = await prisma.list_item.findUnique({
      where: { id: input.itemId },
      include: {
        list: {
          include: {
            user: { include: { storage: true } },
            team: { include: { storage: true } },
          },
        },
      },
    });

    if (!item || item.listId !== listId) {
      logger.warn(
        "List item not found or does not belong to the specified list",
      );
      throw new NotFoundError("List item not found");
    }
    const updatedFiles = item.uploadedFiles.includes(input.fileName)
      ? item.uploadedFiles
      : [...item.uploadedFiles, input.fileName];

    await prisma.list_item.update({
      where: { id: input.itemId },
      data: { uploadedFiles: updatedFiles },
    });

    logger.info("Uploaded file added to list item successfully");
    return { success: true };
  }
}
