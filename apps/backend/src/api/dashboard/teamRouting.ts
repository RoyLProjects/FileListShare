import { endpointsFactory } from "../../lib/resultHandler.js";
import { requireAuth } from "../../middelware/requireAuth.js";
import { DependsOnMethod } from "express-zod-api";
import {
  createTeamRequestSchema,
  DeleteTeamRequestSchema,
  DeleteTeamResponseSchema,
  GetTeamRequestSchema,
  GetTeamResponseSchema,
  UpdateTeamRequestSchema,
  UpdateTeamResponseSchema,
} from "../../schemas/dashboard/teamSchema.js";
import { TeamService } from "../../services/dashboard/teamService.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

const getTeamEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetTeamRequestSchema,
  output: GetTeamResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamService.getTeam(input, userId);
  },
  shortDescription: "gets team for the authenticated user",
  description: "gets a list of teams for the authenticated user.",
  tag: "team",
});

const createTeamEndpoint = authedEndpointsFactory.build({
  method: "post",
  input: createTeamRequestSchema,
  output: UpdateTeamResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamService.createTeam(input, userId);
  },
  shortDescription: "updates a team for the authenticated user",
  description:
    "updates a team for the authenticated user. Supports specifying a team or personal team.",
  tag: "team",
});

const updateTeamEndpoint = authedEndpointsFactory.build({
  method: "patch",
  input: UpdateTeamRequestSchema,
  output: UpdateTeamResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamService.updateTeam(input, userId);
  },
  shortDescription: "updates a team for the authenticated user",
  description:
    "updates a team for the authenticated user. Supports specifying a team or personal team.",
  tag: "team",
});

const deleteTeamEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: DeleteTeamRequestSchema,
  output: DeleteTeamResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamService.deleteTeam(input, userId);
  },
  shortDescription: "deletes a team for the authenticated user",
  description:
    "deletes a team for the authenticated user. Supports specifying a team or personal team.",
  tag: "team",
});

export const TeamRouting = new DependsOnMethod({
  get: getTeamEndpoint,
  post: createTeamEndpoint,
  patch: updateTeamEndpoint,
  delete: deleteTeamEndpoint,
});
