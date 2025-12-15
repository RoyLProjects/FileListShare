import { setTimeout } from "node:timers/promises";
import { PrismaClient as AppPrismaClient } from "../../prisma/app/generated/app/index.js";
import { PrismaClient as AuthPrismaClient } from "../../prisma/auth/generated/auth/index.js";
import { logger } from "./log.js";
import { env } from "../env.js";
import { PrismaPg } from '@prisma/adapter-pg';

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
    const adapter = new PrismaPg({
      url: env.DATABASE_URL,
    });
    // Initialize application (PostgreSQL) database
    prisma = new AppPrismaClient({
      adapter: adapter,
    });
    await retryConnection(() => prisma!.$connect(), "PostgreSQL");
  }

  if (!authPrisma) {
    const adapter = new PrismaPg({
      url: env.AUTH_DATABASE_URL,
    });
    // Initialize Better Auth (PostgreSQL) auth database
    authPrisma = new AuthPrismaClient({
      adapter: adapter,
    });
    await retryConnection(() => authPrisma!.$connect(), "Auth PostgreSQL");
  }
};

export const getAppPrismaClient = (): AppPrismaClient => {
  if (!prisma) {
    const adapter = new PrismaPg({
      url: env.DATABASE_URL,
    });
    prisma = new AppPrismaClient({
      adapter: adapter,
    });
  }
  return prisma;
};

export const getAuthPrismaClient = (): AuthPrismaClient => {
  if (!authPrisma) {
    const adapter = new PrismaPg({
      url: env.AUTH_DATABASE_URL,
    });
    authPrisma = new AuthPrismaClient({
      adapter: adapter,
    });
  }
  return authPrisma;
};

export const getDatabaseAppStatus = async (): Promise<boolean> => {
  try {
    const adapter = new PrismaPg({
      url: env.DATABASE_URL,
    });
    // Use existing client if present, otherwise use a transient client for the check
    const client =
      prisma ??
      new AppPrismaClient({
        adapter: adapter,
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
    const adapter = new PrismaPg({
      url: env.AUTH_DATABASE_URL,
    });
    // Use existing client if present, otherwise use a transient client for the check
    const client =
      authPrisma ??
      new AuthPrismaClient({
        adapter: adapter,
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
