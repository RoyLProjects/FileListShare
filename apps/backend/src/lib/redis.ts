import { createClient, RedisClientType } from "redis";
import { env } from "../env.js";
import { logger } from "./log.js";

let redis: RedisClientType | null = null;

export const initRedis = async () => {
  if (!env.REDIS_URL) {
    console.error(
      "Redis URL is not provided. Set the REDIS_URL environment variable.",
    );
    process.exit(1);
  }

  if (!redis) {
    redis = createClient({
      url: env.REDIS_URL,
      socket: {
        connectTimeout: 2000,
        // Built-in retry strategy: retry up to 5 times, then fail hard
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            // Stop retrying by returning an Error – connect() will reject
            return new Error("Redis reconnect retries exhausted");
          }

          // Wait a bit between retries (here: linear backoff, max 2s)
          return Math.min(retries * 1000, 2000);
        },
      },
    });

    redis.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    try {
      // Single call, built-in reconnect loop handles retries.
      await redis.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.error(
        "Failed to establish initial Redis connection. Exiting.",
        err,
      );
      process.exit(1); // Crash entire backend on init failure
    }
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redis) {
    throw new Error("Redis client is not initialized. Call initRedis first.");
  }
  return redis;
};

export const getRedisClientStatus = async (): Promise<boolean> => {
  try {
    if (!env.REDIS_URL) {
      console.error("Redis URL not configured (REDIS_URL missing)");
      return false;
    }

    if (redis) {
      // If existing client is open, do a lightweight ping
      if (redis.isOpen) {
        try {
          // ping should return 'PONG' when available; ignore the value
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await redis.ping();
        } catch {
          // If ping fails, try reconnecting briefly
          try {
            await redis.connect();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await redis.ping();
          } catch {
            console.error("Redis ping/reconnect failed");
            return false;
          }
        }
        return true;
      }

      // If client exists but is not open, try to connect and ping
      try {
        await redis.connect();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await redis.ping();
        return true;
      } catch {
        logger.error("Redis connect/ping failed");
        return false;
      }
    }

    // No shared client: create a transient client, connect, ping, then disconnect
    const client = createClient({ url: env.REDIS_URL });
    client.on("error", () => {
      // swallow here; we'll handle via thrown errors
      logger.error("Transient Redis client error");
    });

    try {
      await client.connect();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.ping();
      await client.disconnect();
      return true;
    } catch {
      try {
        await client.disconnect();
      } catch {}
      logger.error("Transient Redis status check failed");
      return false;
    }
  } catch {
    logger.error("Unexpected error while checking Redis status");
    return false;
  }
};
