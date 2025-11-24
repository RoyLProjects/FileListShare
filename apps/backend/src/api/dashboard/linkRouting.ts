import { DependsOnMethod } from "express-zod-api";
import { requireAuth } from "../../middelware/requireAuth.js";
import { endpointsFactory } from "../../lib/resultHandler.js";
import {
  CreateLinkRequestSchema,
  GetLinkRequestSchema,
  linkDeleteResponseSchema,
  LinkResponseSchema,
} from "../../schemas/dashboard/linkSchemas.js";
import { LinkService } from "../../services/dashboard/linkService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

// Create individual endpoints
const getLinkEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetLinkRequestSchema,
  output: LinkResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await LinkService.getLink(input, userId);
  },
  shortDescription: "get link for a list",
  description:
    "gets a shareable link for the specified list. If the link does not exist, it will be created.",
  tag: "link",
});

const createLinkEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: CreateLinkRequestSchema,
  output: LinkResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await LinkService.createLink(input, userId);
  },
  shortDescription: "create link for a list",
  description:
    "creates a shareable link for the specified list. If the link already exists, it will be returned.",
  tag: "link",
});

const deleteLinkEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: GetLinkRequestSchema,
  output: linkDeleteResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await LinkService.deleteLink(input, userId);
  },
  shortDescription: "get link for a list",
  description:
    "gets a shareable link for the specified list. If the link does not exist, it will be created.",
  tag: "link",
});

export const linkRouting = new DependsOnMethod({
  get: getLinkEndpoint,
  post: createLinkEndpoint,
  delete: deleteLinkEndpoint,
});
