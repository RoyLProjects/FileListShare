import { logger } from "../../lib/log.js";
import { getAppPrismaClient } from "../../lib/db.js";
import { z } from "zod";
import {
  inviteMemberRequestSchema,
  inviteMemberResponseSchema,
} from "../../schemas/dashboard/teamInviteSchema.js";
import { ConflictError, ForbiddenError } from "../../lib/resultHandler.js";
import { getUserByEmail } from "../../lib/auth.js";

export class TeamInviteService {
  static async postInvite(
    input: z.infer<typeof inviteMemberRequestSchema>,
    userId: string,
  ): Promise<z.infer<typeof inviteMemberResponseSchema>> {
    const prisma = getAppPrismaClient();

    //check if user is part of team
    const teamMember = await prisma.teamMember.findFirst({
      where: {
        teamId: input.teamId,
        userId: userId,
      },
      include: {
        permissions: true,
      },
    });
    if (!teamMember) {
      logger.warn(
        "List create request: user is not a member of the target team",
      );
      throw new ForbiddenError("User is not a member of the target team");
    }
    const canInvite = teamMember.permissions.some(
      (p) => String(p.permission) === "TEAM_MEMBER_CREATE",
    );
    if (!canInvite) {
      logger.warn(
        "Team invite request: user does not have permission to invite members",
      );
      throw new ForbiddenError(
        "User does not have permission to invite members",
      );
    }
    var userToInvite = await getUserByEmail(input.email);
    if (!userToInvite) {
      logger.warn(
        `Team invite request: no user found with email ${input.email}`,
      );
      throw new ConflictError(`No user found with email ${input.email}`);
    }
    // add user to team
    await prisma.teamMember.create({
      data: {
        teamId: input.teamId,
        userId: userToInvite,
        createdBy: userId,
      },
    });

    return {
      success: true,
      message: "Member invited successfully",
    };
  }
}
