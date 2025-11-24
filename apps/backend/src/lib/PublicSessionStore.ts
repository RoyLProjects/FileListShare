import { env } from "../env.js";
import { getRedisClient } from "./redis.js";

const PUBLIC_SESSION_PREFIX = "Public_session:";

export interface PublicSessionData {
  token: string;
  listId: string;
}

export class PublicSessionStore {
  /**
   * Creates a new public session in Redis with TTL based on PUBLIC_SESSION_MAX_AGE
   * @param sessionId - The unique session identifier
   * @param data - The session data containing token and listId
   */
  static async create(
    sessionId: string,
    data: PublicSessionData,
  ): Promise<void> {
    const redis = getRedisClient();
    const key = PUBLIC_SESSION_PREFIX + sessionId;
    await redis.setEx(
      key,
      Math.floor(env.PUBLIC_SESSION_MAX_AGE / 1000),
      JSON.stringify(data),
    );
  }

  /**
   * Retrieves public session data from Redis by session ID
   * @param sessionId - The unique session identifier
   * @returns The stored session data or null if not found
   */
  static async get(sessionId: string): Promise<PublicSessionData | null> {
    const redis = getRedisClient();
    const key = PUBLIC_SESSION_PREFIX + sessionId;
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  /**
   * Deletes a public session from Redis by session ID
   * @param sessionId - The unique session identifier
   */
  static async delete(sessionId: string): Promise<void> {
    const redis = getRedisClient();
    const key = PUBLIC_SESSION_PREFIX + sessionId;
    await redis.del(key);
  }

  /**
   * Refreshes the TTL of an existing public session to extend its lifetime
   * @param sessionId - The unique session identifier
   */
  static async refresh(sessionId: string): Promise<void> {
    const redis = getRedisClient();
    const key = PUBLIC_SESSION_PREFIX + sessionId;
    await redis.expire(key, Math.floor(env.PUBLIC_SESSION_MAX_AGE / 1000));
  }
}
