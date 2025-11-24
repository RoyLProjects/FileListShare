// auth-middleware.ts
import { Middleware } from "express-zod-api";
import { z } from "zod";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { UnauthorizedError } from "../lib/resultHandler.js";
import { env } from "../env.js";
import { getAppPrismaClient } from "../lib/db.js";

export const developerSession = {
  session: {
    session: {
      id: "dev-session",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "dev-user",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      token: "dev-token",
      ipAddress: "127.0.0.1",
      userAgent: "dev-environment",
    },
    user: {
      id: "dev-user",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "dev@example.com",
      emailVerified: true,
      name: "Dev User",
      image: null,
    },
  },
} as const;

export const requireAuth = new Middleware({
  // optioneel, alleen nodig als je via input ook nog iets wilt meekrijgen
  input: z.object({}),

  handler: async ({ request, logger }) => {
    logger.debug("Checking Better Auth session");

    if (env.NODE_ENV === "development") {
      logger.debug("Development mode: skipping auth");
      const prisma = getAppPrismaClient();
      await prisma.user.upsert({
        where: { id: developerSession.session.user.id },
        update: {},
        create: {
          id: developerSession.session.user.id,
        },
      });
      return developerSession;
    }

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session || !session.user) {
      throw new UnauthorizedError("Unauthorized");
    }

    return { session };
  },
});
