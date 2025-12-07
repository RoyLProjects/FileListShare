// auth.ts
import { betterAuth, logger } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getAppPrismaClient, getAuthPrismaClient } from "./db.js";
import { getRedisClient } from "./redis.js";
import { env } from "../env.js";
import { encryptRefreshToken } from "./crypto.js";

export const auth = betterAuth({
  // Prisma as primary DB (use the auth database schema/client)
  database: prismaAdapter(getAuthPrismaClient(), {
    // change this to "mysql" | "sqlite" if needed
    provider: "postgresql",
  }),
  trustedOrigins: [env.FRONTEND_URL],
  appUrl: env.BASE_URL,
  basePath: "/api/auth",
  // Hooks to sync with your application database

  databaseHooks: {
    user: {
      create: {
        // draait ná het aanmaken van de Better Auth user
        after: async (user) => {
          const appPrisma = getAppPrismaClient();
          await appPrisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: {
              id: user.id,
            },
          });
        },
      },

      delete: {
        after: async (user) => {
          const appPrisma = getAppPrismaClient();
          await appPrisma.user.deleteMany({
            where: { id: user.id },
          });
        },
      },
    },
    account: {
      create: {
        before: async (account) => {
          if (account.refreshToken) {
            account.refreshToken = encryptRefreshToken(account.refreshToken);
          }
          if (account.accessToken) {
            account.accessToken = encryptRefreshToken(account.accessToken);
          }
        },
        after: async (account) => {
          if (account.providerId !== "dropbox") {
            logger.warn(
              `Unsupported providerId ${account.providerId} in account create hook`,
            );
            return;
          }

          if (!account.refreshToken) {
            logger.error(
              "No refresh token received from Dropbox! This means the OAuth flow did not request offline access properly.",
            );
            return;
          }

          const appPrisma = getAppPrismaClient();
          await appPrisma.storage.upsert({
            where: { userId: account.userId },
            create: {
              type: "dropbox",
              displayName: `Dropbox (${account.accountId})`,
              refreshToken: account.refreshToken,
              userId: account.userId,
              storagePath: "/FileListShare",
            },
            update: {
              displayName: `Dropbox (${account.accountId})`,
              refreshToken: account.refreshToken,
            },
          });

          logger.info(
            "Successfully stored Dropbox refresh token for user:",
            account.userId,
          );
        },
      },
      update: {
        before: async (account) => {
          if (account.refreshToken) {
            account.refreshToken = encryptRefreshToken(account.refreshToken);
          }
          if (account.accessToken) {
            account.accessToken = encryptRefreshToken(account.accessToken);
          }
        },
        after: async (account) => {
          if (account.providerId !== "dropbox") return;

          if (!account.refreshToken) return;

          const appPrisma = getAppPrismaClient();
          await appPrisma.storage.upsert({
            where: { userId: account.userId },
            create: {
              type: "dropbox",
              displayName: `Dropbox (${account.accountId})`,
              refreshToken: account.refreshToken,
              userId: account.userId,
              storagePath: "/FileListShare",
            },
            update: {
              displayName: `Dropbox (${account.accountId})`,
              refreshToken: account.refreshToken,
            },
          });
        },
      },
    },
  },

  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "secondary-storage",
    customRules: {
      "/sign-in/email": {
        window: 10,
        max: 3,
      },
      "/sign-in/oauth/*": {
        window: 60,
        max: 10,
      },

      "/sign-up/email": {
        window: 300,
        max: 3,
      },
    },
  },

  // Redis as secondary storage for sessions / rate limits
  secondaryStorage: {
    get: async (key) => {
      const value = await getRedisClient().get(key);
      return value ?? null;
    },
    set: async (key, value, ttl) => {
      // ttl is in seconds, Redis EX also expects seconds
      if (ttl) {
        await getRedisClient().set(key, value, { EX: ttl });
      } else {
        await getRedisClient().set(key, value);
      }
    },
    delete: async (key) => {
      await getRedisClient().del(key);
    },
  },

  // Store sessions only in Redis (not in DB)
  session: {
    storeSessionInDatabase: false,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  // Example: turn on email/password login
  emailAndPassword: {
    enabled: false,
    requireEmailVerification: false,
  },
  socialProviders: {
    dropbox: {
      clientId: env.DROPBOX_CLIENT_ID,
      clientSecret: env.DROPBOX_CLIENT_SECRET,
      scope: [
        "files.metadata.read",
        "files.content.write",
        "files.content.read",
      ],
      token_access_type: "offline",
      accessType: "offline",
      force_reapprove: true,
    },
  },
});

export async function getUserByEmail(email: string): Promise<string | null> {
  const prisma = getAuthPrismaClient();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user ? user.id : null;
}

export async function getUserNameById(userId: string): Promise<string | null> {
  const prisma = getAuthPrismaClient();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user ? user.name : null;
}
