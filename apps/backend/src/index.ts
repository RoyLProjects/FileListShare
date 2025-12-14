import { createApp } from "./app.js";
import { env } from "./env.js";
import { InitDatabase } from "./lib/db.js";
import { initLoki, logger } from "./lib/log.js";
import { initRedis } from "./lib/redis.js";

const port = env.PORT;

try {
  await InitDatabase();
  await initRedis();
  await initLoki();

  const { app } = await createApp();
  app.listen(port, () =>
    logger.info({ port, base: env.BASE_URL }, "Backend listening"),
  );
} catch (err) {
  console.error("Failed to start the application", err);
  process.exit(1);
}
