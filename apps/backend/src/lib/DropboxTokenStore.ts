import { decryptRedisToken, encryptRedisToken } from "./crypto.js";
import { getRedisClient } from "./redis.js";

const DROPBOX_TOKEN_PREFIX = "dropbox_token:";

export interface DropboxTokenData {
  accessToken: string;
  expiresAt: number; // Unix timestamp in milliseconds
}

export class DropboxTokenStore {
  /**
   * Creates a Redis key by combining listId and userId with the Dropbox token prefix
   * @param listId - The list ID
   * @param userId - The user ID
   * @returns The formatted Redis key string
   */
  private static getKey(listId: string, userId: string): string {
    return `${DROPBOX_TOKEN_PREFIX}${listId}:${userId}`;
  }

  /**
   * Stores an access token in Redis with TTL
   * @param listId - The list ID
   * @param userId - The user ID
   * @param accessToken - The Dropbox access token
   * @param expiresIn - Token lifetime in seconds (typically 14400 = 4 hours)
   * @returns Promise that resolves when the token is stored
   */
  static async create(
    listId: string,
    userId: string,
    accessToken: string,
    expiresIn: number,
  ): Promise<void> {
    const key = this.getKey(listId, userId);
    const expiresAt = Date.now() + expiresIn * 1000;

    const data: DropboxTokenData = {
      accessToken,
      expiresAt,
    };

    const encryptedData = encryptRedisToken(JSON.stringify(data));

    const ttl = expiresIn + 60; // Add 60 seconds buffer
    const redis = getRedisClient();
    await redis.setEx(key, ttl, encryptedData);
  }

  /**
   * Retrieves an access token from Redis
   * @param listId - The list ID
   * @param userId - The user ID
   * @returns Token data if exists and not expired, null otherwise
   */
  static async get(
    listId: string,
    userId: string,
  ): Promise<DropboxTokenData | null> {
    const key = this.getKey(listId, userId);
    const redis = getRedisClient();
    const encryptedData = await redis.get(key);

    if (!encryptedData) return null;

    const decryptedData = decryptRedisToken(encryptedData);
    const tokenData: DropboxTokenData = JSON.parse(decryptedData);

    // Check if token is expired (with 5 minute buffer before actual expiry)
    if (tokenData.expiresAt - 300000 < Date.now()) {
      await this.delete(listId, userId);
      return null;
    }

    return tokenData;
  }

  /**
   * Deletes an access token from Redis
   * @param listId - The list ID
   * @param userId - The user ID
   * @returns Promise that resolves when the token is deleted
   */
  static async delete(listId: string, userId: string): Promise<void> {
    const key = this.getKey(listId, userId);
    const redis = getRedisClient();
    await redis.del(key);
  }

  /**
   * Refreshes the TTL of an existing token
   * @param listId - The list ID
   * @param userId - The user ID
   * @param expiresIn - New TTL in seconds
   * @returns Promise that resolves when the TTL is refreshed
   */
  static async refresh(
    listId: string,
    userId: string,
    expiresIn: number,
  ): Promise<void> {
    const key = this.getKey(listId, userId);
    const ttl = expiresIn + 60; // Add 60 seconds buffer
    const redis = getRedisClient();
    await redis.expire(key, ttl);
  }
}
