import z from "zod";

export const inviteMemberRequestSchema = z.object({
  email: z.string().email().describe("Email of the member to invite"),
  teamId: z.string().uuid().describe("ID of the team to which the member is invited"),
});

export const inviteMemberResponseSchema = z.object({
  success: z.boolean().describe("Indicates if the invitation was sent successfully"),
  message: z.string().optional().describe("Additional information about the invitation process"),
});
