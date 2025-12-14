import { DependsOnMethod } from "express-zod-api";
import { requireAuth } from "../../middelware/requireAuth.js";
import { endpointsFactory } from "../../lib/resultHandler.js";
import {
  CreateListDetailsRequestSchema,
  createListDetailsResponseSchema,
  deleteListDetailsResponseSchema,
  DeleteListRequestSchema,
  GetListDetailsRequestSchema,
  ListDetailsResponseSchema,
  UpdateListDetailsRequestSchema,
} from "../../schemas/dashboard/listDetailsSchema.js";
import { ListDetailsService } from "../../services/dashboard/listDetailsService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

// Create individual endpoints
const getListDetailsEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetListDetailsRequestSchema,
  output: ListDetailsResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListDetailsService.getDetails(input, userId);
  },
  shortDescription: "get list details",
  description:
    "gets details of items in a specific list for the authenticated user",
  tag: "listDetails",
});

// create list details endpoint
const createListDetailsEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: CreateListDetailsRequestSchema,
  output: createListDetailsResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListDetailsService.createListItem(input, userId);
  },
  shortDescription: "create list item",
  description:
    "creates a new item in a specific list for the authenticated user",
  tag: "listDetails",
});

// update list details endpoint
const updateListDetailsEndpoint = authedEndpointsFactory.build({
  method: "patch",
  input: UpdateListDetailsRequestSchema,
  output: createListDetailsResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListDetailsService.updateListItem(input, userId);
  },
  shortDescription: "update list item",
  description:
    "updates an existing item in a specific list for the authenticated user",
  tag: "listDetails",
});

// delete list details endpoint
const deleteListDetailsEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: DeleteListRequestSchema,
  output: deleteListDetailsResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await ListDetailsService.deleteItem(input, userId);
  },
  shortDescription: "delete list item",
  description:
    "deletes an existing item in a specific list for the authenticated user",
  tag: "listDetails",
});

export const listDetailsRouting = new DependsOnMethod({
  get: getListDetailsEndpoint,
  post: createListDetailsEndpoint,
  patch: updateListDetailsEndpoint,
  delete: deleteListDetailsEndpoint,
});
