// auth.ts
import { betterAuth } from "better-auth";
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
        after: async (account) => {
          if (account.providerId !== "dropbox") return; 

          if (!account.refreshToken) return;
          const encryptedRefreshToken = encryptRefreshToken(
            account.refreshToken,
          );

          const appPrisma = getAppPrismaClient();
          await appPrisma.storage.upsert({
            where: { userId: account.userId },
            create: {
              type: "dropbox",
              displayName: `Dropbox (${account.idToken})`,
              refreshToken: encryptedRefreshToken,
              userId: account.userId,
            },
            update: {
              displayName: `Dropbox (${account.idToken})`,
              refreshToken: encryptedRefreshToken,
            },
          });
        },
      },
      update: {
        // optioneel: tokens updaten als Better Auth ze vernieuwt
        after: async (account) => {
          if (account.providerId !== "dropbox") return;

          if (!account.refreshToken) return;
          const encryptedRefreshToken = encryptRefreshToken(
            account.refreshToken,
          );

          const appPrisma = getAppPrismaClient();
          await appPrisma.storage.upsert({
            where: { userId: account.userId },
            create: {
              type: "dropbox",
              displayName: `Dropbox (${account.idToken})`,
              refreshToken: encryptedRefreshToken,
              userId: account.userId,
            },
            update: {
              displayName: `Dropbox (${account.idToken})`,
              refreshToken: encryptedRefreshToken,
            },
          });
        },
      },
    },
  },

  rateLimit: {
    enabled: true,
    window: 60, // tijdsvenster in seconden
    max: 100, // maximum aantal verzoeken in dat venster
    storage: "secondary-storage", // of "redis"/"database" – zie hieronder
    customRules: {
      "/sign-in/email": {
        window: 10,
        max: 3,
      },
      "/sign-in/oauth/*": {
        window: 60,
        max: 10,
      },
      // --- REGISTER ---
      "/sign-up/email": {
        window: 300, // 5 minuten
        max: 3, // max 3 registraties per IP per 5 min
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
      scope: ["files.metadata.read", "files.content.write"],
      tokenAccessType: "offline",
    },
  },
});
