// scripts/run-migrations.mjs
import "dotenv/config";
import { spawn } from "node:child_process";

// Build a Postgres URL from pieces
function buildPostgresUrl({ user, password, host, dbName }) {
  const u = encodeURIComponent(user);
  const p = encodeURIComponent(password);
  return `postgresql://${u}:${p}@${host}/${dbName}`;
}

const { APP_DB_Name, AUTH_DB_Name, DATABASE_HOST, MIGRATOR_DB_PASSWORD } =
  process.env;

// Defaults, matching your env.ts logic
const APP_DB_NAME = APP_DB_Name ?? "customdb";
const AUTH_DB_NAME = AUTH_DB_Name ?? "authdb";
const DB_HOST = DATABASE_HOST ?? "localhost:5432";

// Both databases use the SAME migrator user + password
const CUSTOM_DB_URL = buildPostgresUrl({
  user: "app_migrator",
  password: MIGRATOR_DB_PASSWORD,
  host: DB_HOST,
  dbName: APP_DB_NAME,
});

const AUTH_DB_URL = buildPostgresUrl({
  user: "auth_app_migrator",
  password: MIGRATOR_DB_PASSWORD,
  host: DB_HOST,
  dbName: AUTH_DB_NAME,
});

// Basic safety checks
if (!MIGRATOR_DB_PASSWORD) {
  console.error("❌ MIGRATOR_DB_PASSWORD is not set");
  process.exit(1);
}

function run(command, extraEnv) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, {
      shell: true,
      stdio: "inherit",
      env: { ...process.env, ...extraEnv },
    });

    proc.on("exit", (code) => {
      if (code !== 0) reject(new Error(`${command} failed with code ${code}`));
      else resolve();
    });
  });
}

async function main() {
  const target = process.argv[2] ?? "all";

  if (target === "custom") {
    console.log("\n📦 Running Custom DB migrations with:");
    console.log("   DATABASE_URL =", CUSTOM_DB_URL);
    await run("prisma migrate deploy --schema=prisma/app/schema.prisma", {
      DATABASE_URL: CUSTOM_DB_URL,
    });
  }

  if (target === "auth") {
    console.log("\n🔐 Running Auth DB migrations with:");
    console.log("   AUTH_DATABASE_URL =", AUTH_DB_URL);
    // auth schema and its migrations are kept in prisma/auth so they don't
    await run("prisma migrate deploy --schema=prisma/auth/schema.prisma", {
      AUTH_DATABASE_URL: AUTH_DB_URL,
    });
  }

  console.log("\n✅ Migrations completed successfully for target:", target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
