import { getRedisClient } from "./redis.js";

const PKCE_PREFIX = "pkce:";

export interface PKCEData {
  codeVerifier: string;
  state: string;
  userId?: string;
  teamId?: string;
  listId?: string;
}

export class PKCEStore {
  /**
   * Stores PKCE data in Redis with a 10-minute TTL
   * @param state - The OAuth state parameter used as the key
   * @param data - The PKCE data containing codeVerifier, state, and optional user/team/list IDs
   * @returns Promise that resolves when the data is stored
   */
  static async create(state: string, data: PKCEData): Promise<void> {
    const key = PKCE_PREFIX + state;
    const redis = getRedisClient();
    await redis.setEx(key, 600, JSON.stringify(data)); // 10 minutes
  }

  /**
   * Retrieves PKCE data from Redis by state
   * @param state - The OAuth state parameter used as the key
   * @returns The stored PKCE data or null if not found
   * @throws Error if there is an issue retrieving the data
   */
  static async get(state: string): Promise<PKCEData | null> {
    const key = PKCE_PREFIX + state;
    const redis = getRedisClient();
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  /**
   * Deletes PKCE data from Redis by state
   * @param state - The OAuth state parameter used as the key
   * @returns Promise that resolves when the data is deleted
   */
  static async delete(state: string): Promise<void> {
    const key = PKCE_PREFIX + state;
    const redis = getRedisClient();
    await redis.del(key);
  }
}
