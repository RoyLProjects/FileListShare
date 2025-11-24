import { endpointsFactory } from "../../lib/resultHandler.js";
import { requireAuth } from "../../middelware/requireAuth.js";
import { DependsOnMethod } from "express-zod-api";
import {
  DeleteStorageRequestSchema,
  DeleteStorageResponseSchema,
  GetStorageRequestSchema,
  GetStorageResponseSchema,
  UpdateStorageRequestSchema,
} from "../../schemas/dashboard/storageSchema.js";
import { StorageService } from "../../services/dashboard/storageService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

const getStorageEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetStorageRequestSchema,
  output: GetStorageResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await StorageService.getStorage(input, userId);
  },
  shortDescription: "gets storage for the authenticated user",
  description:
    "gets storage for the authenticated user. Supports specifying a team or personal storage.",
  tag: "storage",
});

const updateStorageEndpoint = authedEndpointsFactory.build({
  method: "patch",
  input: UpdateStorageRequestSchema,
  output: GetStorageResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await StorageService.updateStorage(input, userId);
  },
  shortDescription: "updates storage for the authenticated user",
  description:
    "updates storage for the authenticated user. Supports specifying a team or personal storage.",
  tag: "storage",
});

const deleteStorageEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: DeleteStorageRequestSchema,
  output: DeleteStorageResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await StorageService.deleteStorage(input, userId);
  },
  shortDescription: "deletes storage for the authenticated user",
  description:
    "deletes storage for the authenticated user. Supports specifying a team or personal storage.",
  tag: "storage",
});

export const StorageRouting = new DependsOnMethod({
  get: getStorageEndpoint,
  patch: updateStorageEndpoint,
  delete: deleteStorageEndpoint,
});
