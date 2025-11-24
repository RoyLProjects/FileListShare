import { z } from "zod";
import { randomBytes } from "node:crypto";
import dotenv from "dotenv";

// Load .env in non-production environments so process.env contains
// values from `apps/backend/.env` before zod parses `process.env`.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// If no AUTH_SECRET is provided, auto-generate a secure random secret for
// non-production environments. In production we require the secret to be set
// explicitly so deployments must provide it via env / secrets management.
const defaultAuthSecret =
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "production"
    ? undefined
    : randomBytes(48).toString("hex"));

// Allow the app to be configured to use a different app/auth DB name via env
const APP_DB_NAME = process.env.APP_DB_Name ?? "customdb";
const AUTH_DB_NAME = process.env.AUTH_DB_Name ?? "authdb";

export const baseEnv = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    //database
    APP_DB_Name: z.string().default("customdb"),
    DATABASE_HOST: z.string().default("localhost:5432"),
    DATABASE_USER: z.string().default("postgres"),
    DATABASE_PASSWORD: z.string().min(1),
    // Auth database
    AUTH_DB_Name: z.string().default("authdb"),
    AUTH_DATABASE_HOST: z.string().default("localhost:5432"),
    AUTH_DATABASE_USER: z.string().default("postgres"),
    AUTH_DATABASE_PASSWORD: z.string().min(1),
    // database users
    APP_DB_PASSWORD: z.string().min(8),
    AUTH_DB_PASSWORD: z.string().min(8),
    MIGRATOR_DB_PASSWORD: z.string().min(8),

    //auth encryption secret
    AUTH_SECRET: z.string().min(32),

    //other envs
    BASE_URL: z.string().url().default("http://localhost:3001"),
    FRONTEND_URL: z.string().url().default("http://localhost:5173"),
    REDIS_URL: z.string().url().default("redis://localhost:6379"),
    LOKI_URL: z.string().url().default("http://localhost:3100"),
    PROMETHEUS_ENABLED: z.coerce.boolean().default(false),
    LOG_LEVEL: z
      .enum(["error", "warn", "info", "debug", "trace"])
      .default("info"),
    PUBLIC_SESSION_MAX_AGE: z.coerce.number().default(600000),
    DROPBOX_CLIENT_ID: z.string(),
    DROPBOX_CLIENT_SECRET: z.string(),

    // Storage Encryption
    STORAGE_ENCRYPTION_KEY: z
      .string()
      .length(
        64,
        "STORAGE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)",
      ),

    REDIS_ENCRYPTION_KEY: z
      .string()
      .length(
        64,
        "STORAGE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)",
      ),
    SESSION_SECRET: z
      .string()
      .length(64, "SESSION_SECRET must be 64 hex characters (32 bytes)"),
    SESSION_MAX_AGE: z.coerce.number().default(86400000),
  })
  .parse({ ...process.env, AUTH_SECRET: defaultAuthSecret });

// Build Postgres connection URLs from individual pieces. We keep these
// computed values out of the zod schema since they are derived.
function buildPostgresUrl({
  user,
  password,
  host,
  dbName,
}: {
  user: string;
  password: string;
  host: string;
  dbName: string;
}) {
  // Encode user/password to be safe for special characters
  const u = encodeURIComponent(user);
  const p = encodeURIComponent(password);
  // host is expected to include host:port when needed
  return `postgresql://${u}:${p}@${host}/${dbName}`;
}

const DATABASE_URL = buildPostgresUrl({
  user: "custom_app",
  password: baseEnv.APP_DB_PASSWORD,
  host: baseEnv.DATABASE_HOST,
  dbName: APP_DB_NAME,
});

const AUTH_DATABASE_URL = buildPostgresUrl({
  user: "auth_app",
  password: baseEnv.AUTH_DB_PASSWORD,
  host: baseEnv.AUTH_DATABASE_HOST,
  dbName: AUTH_DB_NAME,
});

export const env = {
  ...baseEnv,
  APP_DB_NAME,
  AUTH_DB_NAME,
  DATABASE_URL,
  AUTH_DATABASE_URL,
} as const;
