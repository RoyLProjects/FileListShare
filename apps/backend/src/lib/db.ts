import { setTimeout } from "node:timers/promises";
import { PrismaClient as AppPrismaClient } from "../../prisma/app/generated/app/index.js";
import { PrismaClient as AuthPrismaClient } from "../../prisma/auth/generated/auth/index.js";
import { logger } from "./log.js";
import { env } from "../env.js";

let prisma: AppPrismaClient | null = null;
let authPrisma: AuthPrismaClient | null = null;

async function retryConnection(
  connectFn: () => Promise<void>,
  name: string,
  retries = 5,
  delay = 2000,
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await connectFn();
      logger.info(`Connected to ${name}`);
      return;
    } catch (err) {
      logger.error(
        `Failed to connect to ${name} (Attempt ${attempt}/${retries})`,
      );
      if (attempt < retries) {
        await setTimeout(delay); // Wait before retrying
      } else {
        logger.error(`Exceeded retry attempts for ${name}`);
        console.debug("Exiting process due to failed database connection", err);
        process.exit(1); // Exit process on failure
      }
    }
  }
}

export const InitDatabase = async () => {
  if (!prisma) {
    // Initialize Prisma (PostgreSQL) app database
    prisma = new AppPrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL, // your URL here
        },
      },
    });
    await retryConnection(() => prisma!.$connect(), "PostgreSQL");
  }

  if (!authPrisma) {
    // Initialize Better Auth (PostgreSQL) auth database
    authPrisma = new AuthPrismaClient({
      datasources: {
        db: {
          url: env.AUTH_DATABASE_URL, // your URL here
        },
      },
    });
    await retryConnection(() => authPrisma!.$connect(), "Auth PostgreSQL");
  }
};

export const getAppPrismaClient = (): AppPrismaClient => {
  if (!prisma) {
    prisma = new AppPrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL, // your URL here
        },
      },
    });
  }
  return prisma;
};

export const getAuthPrismaClient = (): AuthPrismaClient => {
  if (!authPrisma) {
    authPrisma = new AuthPrismaClient({
      datasources: {
        db: {
          url: env.AUTH_DATABASE_URL, // your URL here
        },
      },
    });
  }
  return authPrisma;
};

export const getDatabaseAppStatus = async (): Promise<boolean> => {
  try {
    // Use existing client if present, otherwise use a transient client for the check
    const client =
      prisma ??
      new AppPrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL, // your URL here
          },
        },
      });

    if (!prisma) {
      // transient connect/disconnect to validate connectivity
      await client.$connect();
      await client.$disconnect();
    } else {
      // If a shared client exists, run a lightweight query
      // SELECT 1 is a minimal, no-op check for PostgreSQL
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.$queryRaw`SELECT 1`;
    }

    return true;
  } catch {
    logger.error("App database status check failed");
    return false;
  }
};

export const getDatabaseAuthStatus = async (): Promise<boolean> => {
  try {
    const client =
      authPrisma ??
      new AuthPrismaClient({
        datasources: {
          db: {
            url: env.AUTH_DATABASE_URL, // your URL here
          },
        },
      });

    if (!authPrisma) {
      await client.$connect();
      await client.$disconnect();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.$queryRaw`SELECT 1`;
    }

    return true;
  } catch {
    logger.error("Auth database status check failed");
    return false;
  }
};
