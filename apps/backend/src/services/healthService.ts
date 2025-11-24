import { getDatabaseAppStatus, getDatabaseAuthStatus } from "../lib/db.js";
import { getLokiStatus, logger } from "../lib/log.js";
import { getRedisClientStatus } from "../lib/redis.js";

export class HealthService {
  static async checkHealth(): Promise<{
    database: boolean;
    redis: boolean;
    loki: boolean;
  }> {
    try {
      // Assuming these functions are synchronous; if async, add await
      const database = Boolean(
        (await getDatabaseAppStatus()) && getDatabaseAuthStatus(),
      );
      const redis = Boolean(await getRedisClientStatus());
      const loki = Boolean(getLokiStatus().enabled);

      logger.info("Health check endpoint called");

      return {
        database,
        redis,
        loki,
      };
    } catch {
      logger.error("Health check failed");
      return {
        database: false,
        redis: false,
        loki: false,
      };
    }
  }
}
