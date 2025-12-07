import { z } from "zod";
import { linkRouting } from "./dashboard/linkRouting.js";
import { endpointsFactory } from "../lib/resultHandler.js";
import { listRouting } from "./dashboard/listRouting.js";
import { listDetailsRouting } from "./dashboard/listDetailsRouter.js";
import { StorageRouting } from "./dashboard/storageRouting.js";
import { TeamRouting } from "./dashboard/teamRouting.js";
import { HealthService } from "../services/healthService.js";
import { TeamMemberRouting } from "./dashboard/teamMembersRouter.js";
import { PublicAuthRouting } from "./public/authRouting.js";
import { ItemsRouting } from "./public/itemsRouting.js";
import { ActionRouting } from "./public/actionsRouting.js";
import { DropboxRouting } from "./dashboard/dropboxRouting.js";
import { teamInviteRouting } from "./dashboard/teamInviteRouting.js";

const healthEndpoint = endpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({
    ok: z.boolean(),
    loki: z.boolean(),
  }),
  handler: async () => {
    let result = await HealthService.checkHealth();
    return { ok: result.database && result.redis, loki: result.loki };
  },
  shortDescription: "Health check endpoint",
  description: "Checks the health status of the application services",
  tag: "health",
});

// Define routing structure

export const routing = {
  v1: {
    dashboard: {
      link: linkRouting,
      list: listRouting,
      listDetails: listDetailsRouting,
      team: TeamRouting,
      teammember: TeamMemberRouting,
      teamInvite: teamInviteRouting,
      storage: StorageRouting,
      dropbox: DropboxRouting,
    },
    public: {
      action: ActionRouting,
      auth: PublicAuthRouting,
      items: ItemsRouting,
    },
    health: healthEndpoint,
  },
};

