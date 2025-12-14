import crypto from "node:crypto";
import { env } from "../env.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // AES block size

/**
 * Generic encryption function using AES-256-GCM
 * @param plainText - The plain text to encrypt
 * @param key - The encryption key (32 bytes hex string)
 * @returns Encrypted text in format: iv:authTag:encryptedData (hex encoded)
 */
function encrypt(plainText: string, key: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);

  const keyBuffer = Buffer.from(key, "hex");

  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Generic decryption function using AES-256-GCM
 * @param encryptedText - The encrypted text in format: iv:authTag:encryptedData
 * @param key - The encryption key (32 bytes hex string)
 * @returns Decrypted plain text
 */
function decrypt(encryptedText: string, key: string): string {
  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted text format");
  }

  const ivHex = parts[0];
  const authTagHex = parts[1];
  const encryptedData = parts[2];

  if (!ivHex || !authTagHex || !encryptedData) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const keyBuffer = Buffer.from(key, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  decipher.setAuthTag(authTag);

  const decrypted =
    decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
}

/**
 * Encrypts a refresh token using AES-256-GCM with STORAGE_ENCRYPTION_KEY
 * @param refreshToken - The plain text refresh token to encrypt
 * @returns Encrypted token in format: iv:authTag:encryptedData (hex encoded)
 */
export function encryptRefreshToken(refreshToken: string): string {
  return encrypt(refreshToken, env.STORAGE_ENCRYPTION_KEY);
}

/**
 * Decrypts a refresh token that was encrypted with encryptRefreshToken
 * @param encryptedToken - The encrypted token in format: iv:authTag:encryptedData
 * @returns Decrypted plain text refresh token
 */
export function decryptRefreshToken(encryptedToken: string): string {
  return decrypt(encryptedToken, env.STORAGE_ENCRYPTION_KEY);
}

/**
 * Encrypts Redis tokens using AES-256-GCM with REDIS_ENCRYPTION_KEY
 * @param token - The plain text token to encrypt
 * @returns Encrypted token in format: iv:authTag:encryptedData (hex encoded)
 */
export function encryptRedisToken(token: string): string {
  return encrypt(token, env.REDIS_ENCRYPTION_KEY);
}

/**
 * Decrypts a Redis token that was encrypted with encryptRedisToken
 * @param encryptedToken - The encrypted token in format: iv:authTag:encryptedData
 * @returns Decrypted plain text token
 */
export function decryptRedisToken(encryptedToken: string): string {
  return decrypt(encryptedToken, env.REDIS_ENCRYPTION_KEY);
}

/**
 * Generate a random URL-safe string
 * @param length - The desired length of the string (default: 32)
 * @returns A random base64url encoded string
 */
export function generateRandomString(length = 32): string {
  const bytes = crypto.randomBytes(Math.ceil((length * 3) / 4));
  return bytes.toString("base64url").slice(0, length);
}
