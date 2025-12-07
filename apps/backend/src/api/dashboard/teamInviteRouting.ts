import { endpointsFactory } from "../../lib/resultHandler.js";
import { requireAuth } from "../../middelware/requireAuth.js";
import { DependsOnMethod } from "express-zod-api";
import { TeamInviteService } from "../../services/dashboard/teamInviteService.js";
import {
  inviteMemberRequestSchema,
  inviteMemberResponseSchema,
} from "../../schemas/dashboard/teamInviteSchema.js";

export const authedEndpointsFactory =
  endpointsFactory.addMiddleware(requireAuth);

const InviteMember = authedEndpointsFactory.build({
  method: "post",
  input: inviteMemberRequestSchema,
  output: inviteMemberResponseSchema,
  handler: async ({ input, options }) => {
    const { session } = options;
    const userId = session.user.id;

    return await TeamInviteService.postInvite(input, userId);
  },
  shortDescription: "invite a team member based on email.",
  description: "posts a team member invite for specified team ",
  tag: "teammember",
});

export const teamInviteRouting = new DependsOnMethod({
  post: InviteMember,
});
