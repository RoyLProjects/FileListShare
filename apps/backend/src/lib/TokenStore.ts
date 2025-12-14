import { env } from "../env.js";
import { getRedisClient } from "./redis.js";

const TOKEN_PREFIX = "Token:";

/**
 * Interface for token session data containing refresh token
 */
export interface SessionData {
  refreshToken: string;
}

/**
 * Redis-based token store for managing refresh tokens with session-based TTL
 */
export class TokenStore {
  /**
   * Stores refresh token data in Redis with TTL based on SESSION_MAX_AGE
   * @param sessionId - The unique session identifier
   * @param data - The token data containing the refresh token
   */
  static async create(sessionId: string, data: SessionData): Promise<void> {
    const key = TOKEN_PREFIX + sessionId;
    const redis = getRedisClient();
    await redis.setEx(
      key,
      Math.floor(env.SESSION_MAX_AGE / 1000),
      JSON.stringify(data),
    );
  }

  /**
   * Retrieves refresh token data from Redis by session ID
   * @param sessionId - The unique session identifier
   * @returns The stored token data or null if not found
   */
  static async get(sessionId: string): Promise<SessionData | null> {
    const key = TOKEN_PREFIX + sessionId;
    const redis = getRedisClient();
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  /**
   * Deletes refresh token data from Redis by session ID
   * @param sessionId - The unique session identifier
   */
  static async delete(sessionId: string): Promise<void> {
    const key = TOKEN_PREFIX + sessionId;
    const redis = getRedisClient();
    await redis.del(key);
  }

  /**
   * Refreshes the TTL of stored refresh token data to extend its lifetime
   * @param sessionId - The unique session identifier
   */
  static async refresh(sessionId: string): Promise<void> {
    const key = TOKEN_PREFIX + sessionId;
    const redis = getRedisClient();
    await redis.expire(key, Math.floor(env.SESSION_MAX_AGE / 1000));
  }
}
