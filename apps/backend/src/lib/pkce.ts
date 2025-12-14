import { randomBytes, createHash } from "node:crypto";

/**
 * Generates a cryptographically secure random string using base64url encoding
 * @param length - The length of the random string in bytes (default: 32)
 * @returns A base64url encoded random string
 */
export function generateRandomString(length: number = 32): string {
  return randomBytes(length).toString("base64url");
}

/**
 * Creates a SHA256 hash of the input string and returns it in base64url format
 * @param input - The string to hash
 * @returns SHA256 hash of the input in base64url encoding
 */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("base64url");
}

/**
 * Generates PKCE (Proof Key for Code Exchange) code verifier and code challenge pair
 * @returns Object containing codeVerifier, codeChallenge, and codeChallengeMethod
 */
export function generatePKCEPair() {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = sha256(codeVerifier);

  return {
    codeVerifier,
    codeChallenge,
    codeChallengeMethod: "S256" as const,
  };
}

/**
 * Generates a random state parameter for OAuth flow to prevent CSRF attacks
 * @returns A base64url encoded random string for use as OAuth state parameter
 */
export function generateState(): string {
  return generateRandomString(32);
}
