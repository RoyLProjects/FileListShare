import { endpointsFactory } from "../../lib/resultHandler.js";
import { requirePublicAuth } from "../../middelware/publicAuth.js";
import { DependsOnMethod } from "express-zod-api";
import {
  GetItemsRequestSchema,
  GetItemsResponseSchema,
} from "../../schemas/public/itemSchema.js";
import { ItemService } from "../../services/public/itemService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requirePublicAuth);

const getItems = authedEndpointsFactory.build({
  method: "get",
  input: GetItemsRequestSchema,
  output: GetItemsResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;

    const listId = session.listId;
    const token = session.token;
    return await ItemService.getItems(input, listId, token);
  },
  shortDescription: "marks an action as delivered for the authenticated user",
  description: "marks an action as delivered for the authenticated user.",
  tag: "items",
});

export const ItemsRouting = new DependsOnMethod({
  get: getItems,
});
