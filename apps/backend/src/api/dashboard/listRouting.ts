import { DependsOnMethod } from "express-zod-api";
import { requireAuth } from "../../middelware/requireAuth.js";
import { endpointsFactory } from "../../lib/resultHandler.js";
import { ListService } from "../../services/dashboard/listService.js";
import {
  CreatedListResponseSchema,
  CreateListRequestSchema,
  DeleteListRequestSchema,
  DeleteListResponseSchema,
  GetListRequestSchema,
  ListResponseSchema,
  UpdateListRequestSchema,
} from "../../schemas/dashboard/listSchema.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

// get list endpoint
const getListEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetListRequestSchema,
  output: ListResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListService.getList(input, userId);
  },
  shortDescription: "gets lists for the authenticated user",
  description:
    "gets lists for the authenticated user. Supports pagination and filtering by team.",
  tag: "list",
});

// create list endpoint
const createListEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: CreateListRequestSchema,
  output: CreatedListResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListService.createList(input, userId);
  },
  shortDescription: "creates a new list for the authenticated user",
  description:
    "creates a new list for the authenticated user. Supports specifying a team or personal list.",
  tag: "list",
});

// update list endpoint
const updateListEndpoint = authedEndpointsFactory.build({
  method: "patch",
  input: UpdateListRequestSchema,
  output: CreatedListResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListService.updateList(input, userId);
  },
  shortDescription: "updates a list for the authenticated user",
  description:
    "updates a list for the authenticated user. Supports specifying a team or personal list.",
  tag: "list",
});

const deleteListEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: DeleteListRequestSchema,
  output: DeleteListResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListService.deleteList(input, userId);
  },
  shortDescription: "deletes a list for the authenticated user",
  description:
    "deletes a list for the authenticated user. Supports specifying a team or personal list.",
  tag: "list",
});

export const listRouting = new DependsOnMethod({
  get: getListEndpoint,
  post: createListEndpoint,
  patch: updateListEndpoint,
  delete: deleteListEndpoint,
});
