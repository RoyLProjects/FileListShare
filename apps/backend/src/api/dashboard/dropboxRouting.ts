import { DependsOnMethod } from "express-zod-api";
import { endpointsFactory } from "../../lib/resultHandler.js";
import {
  CallbackOauthRequestSchema,
  CallbackOauthResponseSchema,
  DropboxStartRequestSchema,
  DropboxStartResponseSchema,
  getDropboxBrowseRequestSchema,
  getDropboxBrowseResponseSchema,
} from "../../schemas/dashboard/dropboxSchema.js";
import { requireAuth } from "../../middelware/requireAuth.js";
import { DropboxService } from "../../services/dashboard/dropboxService.js";
import { redirectEndpointsFactory } from "../../lib/redirectResultHandler.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

const startEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: DropboxStartRequestSchema,
  output: DropboxStartResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;

    const userId = session.user.id;

    return await DropboxService.start(input, userId);
  },
  shortDescription: "starts the dropbox oauth flow",
  description: "starts the dropbox oauth flow for the authenticated user.",
  tag: "dropbox-start",
});

const callbackEndpoint = redirectEndpointsFactory
  .addMiddleware(requireAuth)
  .build({
    method: "get",
    input: CallbackOauthRequestSchema,
    output: CallbackOauthResponseSchema,
    handler: async ({ input, options }) => {
      const { session } = options;

      const userId = session.user.id;
      const result = await DropboxService.callback(input, userId);
      return result;
    },
    shortDescription: "oauth callback for dropbox",
    description: "oauth callback for dropbox integration.",
    tag: "dropbox-callback",
  });

const browseEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: getDropboxBrowseRequestSchema,
  output: getDropboxBrowseResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;
    return await DropboxService.browse(input, userId);
  },
  shortDescription: "browse dropbox files and folders",
  description: "browse dropbox files and folders for the authenticated user.",
  tag: "dropbox-browse",
});

export const startRouiting = new DependsOnMethod({
  get: startEndpoint,
});

export const callbackRouting = new DependsOnMethod({
  get: callbackEndpoint,
});

export const browseRouting = new DependsOnMethod({
  get: browseEndpoint,
});

export const DropboxRouting = {
  start: startRouiting,
  callback: callbackRouting,
  browse: browseRouting,
};
