import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./env.js";
import { createConfig, attachRouting, Documentation } from "express-zod-api";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
// removed unused imports (leftover from earlier wiring)
import { routing } from "./api/routing.js";
import { pinoLogger } from "./lib/log.js";
import Cookies from "cookies";

export async function createApp() {
  const app = express();
  app.use(pinoLogger);
  app.use(cors({ origin: [env.FRONTEND_URL], credentials: true }));

  app.all("/api/auth/{*any}", toNodeHandler(auth));

  app.use(express.json({ limit: "5mb" }));
  app.use(helmet());

  if (env.PROMETHEUS_ENABLED) {
    const { collectDefaultMetrics, register } = await import("prom-client");
    collectDefaultMetrics();
    app.get("/metrics", async (req, res) => {
      try {
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());
      } catch (err) {
        res.status(500).end((err as Error).message);
      }
    });
  };
  
app.use(
  "/v1/public",
  (req, res, next) => {
    const secrets = [env.PUBLIC_ENDPOINT_COOKIE_SECRET];

    (req as any).cookies = new Cookies(req, res, { keys: secrets });

    next();
  }
);
const config = createConfig({
  app,
  cors: false,
  logger: {
    level: env.LOG_LEVEL,
    color: true,
  }
});

  // Attach express-zod-api routing
  attachRouting(config, routing);

  // Generate OpenAPI document automatically from routing
  const openApiDocument = new Documentation({
    routing: routing,
    config,
    version: "1.0.0",
    title: "FileListShare API",
    serverUrl: env.BASE_URL,
  }).getSpecAsJson();

  app.get("/v1/openapi.json", (_req: Request, res: Response) =>
    res.json(openApiDocument),
  );

  // noop docs route (could be wired to swagger UI in future)
  app.use("/v1/docs", (_req: Request, _res: Response, next: NextFunction) =>
    next(),
  );

  return {
    app,
    openApiDocument,
  };
}
