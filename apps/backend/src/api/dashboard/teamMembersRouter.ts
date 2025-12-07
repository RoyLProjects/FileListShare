import { endpointsFactory } from "../../lib/resultHandler.js";
import { requireAuth } from "../../middelware/requireAuth.js";
import { DependsOnMethod } from "express-zod-api";
import { TeamMemberService } from "../../services/dashboard/teamMemberService.js";
import {
  DeleteTeamMemberRequestSchema,
  DeleteTeamMemberResponseSchema,
  GetTeamMemberRequestSchema,
  GetTeamMemberResponseSchema,
  UpdateTeamMemberRequestSchema,
  UpdateTeamMemberResponseSchema,
} from "../../schemas/dashboard/teamMembersSchema.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

const getTeamMemberEndpoint = authedEndpointsFactory.build({
  method: "get",
  input: GetTeamMemberRequestSchema,
  output: GetTeamMemberResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamMemberService.getTeamMember(input, userId);
  },
  shortDescription: "gets teammember permissions for specified team",
  description: "gets teammember permissions for specified team",
  tag: "teammember",
});

const updateTeamMemberEndpoint = authedEndpointsFactory.build({
  method: "patch",
  input: UpdateTeamMemberRequestSchema,
  output: UpdateTeamMemberResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamMemberService.updateTeamMember(input, userId);
  },
  shortDescription: "updates a team member permissions",
  description:
    "updates a team member for the authenticated user. Supports specifying a team or personal team.",
  tag: "teammember",
});

const deleteTeamMemberEndpoint = authedEndpointsFactory.build({
  method: "delete",
  input: DeleteTeamMemberRequestSchema,
  output: DeleteTeamMemberResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamMemberService.deleteTeamMember(input, userId);
  },
  shortDescription: "deletes a team for the authenticated user",
  description:
    "deletes a team for the authenticated user. Supports specifying a team or personal team.",
  tag: "teammember",
});

export const TeamMemberRouting = new DependsOnMethod({
  get: getTeamMemberEndpoint,
  patch: updateTeamMemberEndpoint,
  delete: deleteTeamMemberEndpoint,
});

