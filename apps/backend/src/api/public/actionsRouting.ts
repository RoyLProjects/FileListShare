import { endpointsFactory } from "../../lib/resultHandler.js";
import { requirePublicAuth } from "../../middelware/publicAuth.js";
import { DependsOnMethod } from "express-zod-api";
import {
  addCommentRequestSchema,
  addUploadedFileRequestSchema,
  MarkDeliveredRequestSchema,
  ResponseSchema,
  uploadUrlRequestSchema,
  uploadUrlResponseSchema,
} from "../../schemas/public/actionSchema.js";
import { ActionService } from "../../services/public/actionService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requirePublicAuth);

const markDeliveredEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: MarkDeliveredRequestSchema,
  output: ResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const listId = session.listId;
    const token = session.token;
    return await ActionService.markDelivered(input, listId, token);
  },
  shortDescription: "marks an action as delivered for the authenticated user",
  description: "marks an action as delivered for the authenticated user.",
  tag: "mark",
});

const addCommentEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: addCommentRequestSchema,
  output: ResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const listId = session.listId;
    const token = session.token;

    return await ActionService.addComment(input, listId, token);
  },
  shortDescription: "adds a comment for the authenticated user",
  description: "adds a comment for the authenticated user.",
  tag: "comment",
});

const uploadUrlEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: uploadUrlRequestSchema,
  output: uploadUrlResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const listId = session.listId;
    const token = session.token;

    return await ActionService.uploadUrl(input, listId, token);
  },
  shortDescription: "uploads a URL for the authenticated user",
  description: "uploads a URL for the authenticated user.",
  tag: "uploadUrl",
});

const addUploadedFileEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: addUploadedFileRequestSchema,
  output: ResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const listId = session.listId;
    const token = session.token;

    return await ActionService.addUploadedFile(input, listId, token);
  },
  shortDescription: "adds an uploaded file for the authenticated user",
  description: "adds an uploaded file for the authenticated user.",
  tag: "uploadedFile",
});

export const markDeliveredRouting = new DependsOnMethod({
  post: markDeliveredEndpoint,
});

export const uploadUrlRouting = new DependsOnMethod({
  post: uploadUrlEndpoint,
});

export const addCommentRouting = new DependsOnMethod({
  post: addCommentEndpoint,
});

export const addUploadedFileRouting = new DependsOnMethod({
  post: addUploadedFileEndpoint,
});

export const ActionRouting = {
  markDelivered: markDeliveredRouting,
  addComment: addCommentRouting,
  uploadUrl: uploadUrlRouting,
  addUploadedFile: addUploadedFileRouting,
};
