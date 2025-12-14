import pinoLib from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "node:crypto";
import type { RequestHandler, Request, Response, NextFunction } from "express";
import { env } from "../env.js";

type ReqWithId = Request & { reqId?: string };

// PostgreSQL UUID pattern: matches v1-v5 UUIDs and nil UUID
// Matches UUIDs after word boundaries, slashes, or at string start/end
const UUID_REGEX =
  /\b(00000000-0000-0000-0000-000000000000|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})\b/gi;

/**
 * Recursively masks PostgreSQL UUIDs in strings, objects, and arrays.
 * Prevents infinite recursion by tracking visited objects with WeakSet.
 * @param value - The value to process (string, object, array, or primitive)
 * @param seen - WeakSet to track visited objects and prevent circular references
 * @param skipKeys - Set of keys to skip masking (e.g., 'id' for request IDs)
 * @returns The value with UUIDs replaced by "[UUID]"
 */
function maskUUIDs(
  value: unknown,
  seen = new WeakSet<object>(),
  skipKeys = new Set<string>(),
): unknown {
  if (typeof value === "string") {
    // Replace UUID directly (word boundaries handle context automatically)
    return value.replace(UUID_REGEX, "[UUID]");
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    return value.map((v) => maskUUIDs(v, seen, skipKeys));
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      // Skip masking for specific keys (like request ID)
      out[k] = skipKeys.has(k) ? v : maskUUIDs(v, seen, skipKeys);
    }
    return out;
  }
  return value;
}

// Create an initial console-only transport so the app can log immediately.
const initialTransport = pinoLib.transport({
  targets: [
    {
      target: "pino-pretty",
      level: env.LOG_LEVEL,
      options: {
        colorize: env.NODE_ENV !== "production",
        translateTime: "HH:MM:ss",
      },
    },
  ],
});

// Defensive attach for transport errors (best-effort)
try {
  const maybeEmitter = initialTransport as {
    on?: (ev: string, fn: (...args: unknown[]) => void) => void;
  };
  if (typeof maybeEmitter.on === "function") {
    maybeEmitter.on("error", (err: unknown) => {
      // Use console to avoid re-entering pino transport when logger uses the same transport
      console.warn(
        "Pino transport error (initial) - continuing without Loki:",
        err,
      );
    });
  }
} catch {
  // best-effort only; if attaching fails, don't crash.
}

// Create a real logger instance that can be swapped later. Start with console-only.
let currentLogger = pinoLib(
  {
    level: env.LOG_LEVEL,
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "req.body.password",
        "req.body.token",
        "res.headers['set-cookie']",
        "password",
        "token",
        "refreshtoken",
        "sessionData",
        "UserId",
        "ListId",
        "TeamId",
        "ItemId",
        "MemberId",
        "CommentId",
        "FileId",
        "UploadUrl",
        "sub",
        "email",
        "name",
        "storageid",
        "storagepath",
      ],
      censor: "[REDACTED]",
    },
    hooks: {
      logMethod(args, method) {
        return method.apply(
          this,
          args.map((arg) =>
            maskUUIDs(arg, new WeakSet(), new Set()),
          ) as Parameters<typeof method>,
        );
      },
    },
  },
  initialTransport,
);

// Keep a reference to the initial console-only logger so we can fall back to it
// if the Loki transport starts failing at runtime.
const initialLoggerRef = currentLogger;

// Loki connection status we can export for diagnostics
type LokiStatus = {
  enabled: boolean; // whether currentLogger is using Loki transport
  usedUrl: string | null; // the base URL used to connect to Loki (if any)
  probeLastOk: boolean | null; // last probe result (true/false) or null if not probed
  transportErrorCount: number; // number of times transport emitted an error
  lastError?: unknown; // last transport error
};

const lokiState: LokiStatus = {
  enabled: false,
  usedUrl: null,
  probeLastOk: null,
  transportErrorCount: 0,
};

export function getLokiStatus(): Readonly<LokiStatus> {
  return { ...lokiState };
}

// Export a lightweight proxy that delegates to the current logger. This lets other
// modules import `logger` immediately while we manage Loki in the background.
type LoggerLike = Record<string, unknown>;

const loggerProxy: LoggerLike = new Proxy(
  {},
  {
    get(_, prop: string) {
      const target =
        (currentLogger as unknown as Record<string, unknown>) ||
        (console as unknown as Record<string, unknown>);
      const val = target[prop];
      if (typeof val === "function") {
        return (val as (...args: unknown[]) => unknown).bind(target);
      }
      return val;
    },
    set(_, prop: string, value) {
      (currentLogger as unknown as Record<string, unknown>)[prop] = value;
      return true;
    },
  },
);

// Keep a reference to the current Loki transport so we can close it on failure.
let lokiTransportRef: unknown = null;

/**
 * Disable Loki logging, revert to console-only logger, and update status.
 */
function disableLokiLogger(reason?: unknown) {
  // Best-effort: try to close the transport if it has an `end` or `close` method
  try {
    const maybeTransport = lokiTransportRef as unknown as {
      end?: () => void;
      close?: () => void;
    };
    if (maybeTransport?.end) maybeTransport.end();
    else if (maybeTransport?.close) maybeTransport.close();
  } catch {
    // ignore
  } finally {
    lokiTransportRef = null;
  }

  currentLogger = initialLoggerRef;
  lokiState.enabled = false;
  lokiState.probeLastOk = false;
  lokiState.transportErrorCount += 1;
  if (reason !== undefined) {
    lokiState.lastError = reason;
  }

  // Use console here to avoid recursion into pino transports
  console.warn(
    "Loki logging disabled, falling back to console-only logger",
    reason,
  );
}

/**
 * Enable Loki logging (assumes Loki is reachable).
 * Does not perform a readiness check; caller is responsible for that.
 */
async function enableLokiLogger(): Promise<boolean> {
  if (!env.LOKI_URL) return false;

  const lokiTransport = pinoLib.transport({
    targets: [
      {
        target: "pino-loki",
        level: env.LOG_LEVEL,
        options: {
          host: env.LOKI_URL,
          labels: {
            app: "FileListShare",
            service: "backend",
            env: env.NODE_ENV,
          },
          batching: true,
          interval: 5,
        },
      },
      {
        target: "pino-pretty",
        level: env.LOG_LEVEL,
        options: {
          colorize: env.NODE_ENV !== "production",
          translateTime: "HH:MM:ss",
        },
      },
    ],
  });

  // Attach runtime error handler to revert to console-only
  try {
    const maybeEmitter = lokiTransport as unknown as {
      on?: (ev: string, fn: (...args: unknown[]) => void) => void;
    };
    if (typeof maybeEmitter.on === "function") {
      maybeEmitter.on("error", (err: unknown) => {
        disableLokiLogger(err);
      });
    }
  } catch {
    // ignore
  }

  lokiTransportRef = lokiTransport;
  lokiState.enabled = true;
  lokiState.usedUrl = String(env.LOKI_URL || "");
  lokiState.lastError = undefined;

  // Best-effort informational log (through proxy so we pick up the new logger)
  (loggerProxy as unknown as { info?: (...args: unknown[]) => unknown }).info?.(
    "Loki enabled for logging",
  );

  return true;
}

// Export the proxy as `logger` for compatibility with existing imports
export const logger = loggerProxy as unknown as ReturnType<typeof pinoLib>;

// Keep your lightweight type-safe factory (now without hooks/redact)
type PinoHttpFactory = (opts?: {
  logger?: unknown;
  genReqId?: (req: Request) => string;
  serializers?: Record<string, (value: unknown) => unknown>;
}) => RequestHandler;

const createPinoHttp = pinoHttp as unknown as PinoHttpFactory;

// Custom serializers to mask UUIDs in request/response
const customSerializers = {
  req: (req: unknown) => {
    const serialized = pinoHttp.stdSerializers.req(req as never);
    // Skip masking the request 'id' field (used for tracing)
    return maskUUIDs(serialized, new WeakSet(), new Set(["id"]));
  },
  res: (res: unknown) => {
    const serialized = pinoHttp.stdSerializers.res(res as never);
    return maskUUIDs(serialized, new WeakSet(), new Set());
  },
  err: (err: unknown) => {
    const serialized = pinoHttp.stdSerializers.err(err as never);
    return maskUUIDs(serialized, new WeakSet(), new Set());
  },
};

// Middleware: now only pass logger + genReqId + serializers
export const httpLoggerMiddleware = createPinoHttp({
  logger,
  genReqId: (req: ReqWithId) => req.reqId || randomUUID(),
  serializers: customSerializers,
});

// pinoLogger stays the same
export const pinoLogger: RequestHandler = (
  req: ReqWithId,
  res: Response,
  next: NextFunction,
) => {
  const id = req.header("x-request-id") || randomUUID().toString();
  req.reqId = id;
  res.setHeader("x-request-id", id);
  return httpLoggerMiddleware(req, res, next);
};

/**
 * Verify Loki is reachable.
 * Performs a GET to `${LOKI_URL}/ready` with a timeout. Returns true when ready.
 * Returns false when Loki isn't configured or when the check fails.
 */
export async function initLoki(timeoutMs = 5000): Promise<boolean> {
  // If Loki isn't configured, skip the readiness check and return false.
  if (!env.LOKI_URL) return false;

  const base = String(env.LOKI_URL).replace(/\/$/, "");
  const url = `${base}/ready`;
  // resolve a fetch-like function if available on the global runtime. We avoid DOM types
  // because the project may not include lib.dom in tsconfig.
  type FetchResponseLike = {
    ok?: boolean;
    status?: number;
    statusText?: string;
  };
  type FetchFn = (
    input: string,
    init?: { method?: string; signal?: unknown },
  ) => Promise<FetchResponseLike>;
  const fetchFn = (globalThis as unknown as { fetch?: FetchFn }).fetch;
  if (!fetchFn) {
    throw new Error(
      "fetch is not available in this runtime to verify Loki readiness",
    );
  }

  // AbortController-like factory and timer helpers (guarded access)
  type AbortControllerLike = { new (): { signal: unknown; abort: () => void } };
  const AbortCtr = (
    globalThis as unknown as { AbortController?: AbortControllerLike }
  ).AbortController;
  if (typeof AbortCtr !== "function") {
    throw new Error(
      "AbortController is not available in this runtime to verify Loki readiness",
    );
  }

  const controller = new AbortCtr();
  const timerSet = (
    globalThis as unknown as { setTimeout?: (...args: unknown[]) => unknown }
  ).setTimeout;
  const timerClear = (
    globalThis as unknown as { clearTimeout?: (t: unknown) => void }
  ).clearTimeout;
  if (typeof timerSet !== "function" || typeof timerClear !== "function") {
    throw new Error(
      "timer functions are not available in this runtime to verify Loki readiness",
    );
  }

  const to = timerSet(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchFn(url, {
      method: "GET",
      signal: controller.signal,
    });
    if (!res || !res.ok) {
      const status = res
        ? `${res.status ?? "?"} ${res.statusText ?? ""}`
        : "no response";
      logger.warn({ status }, "Loki readiness check failed");
      return false;
    }
    return true;
  } catch (err: unknown) {
    const maybe = err as { name?: string; message?: string } | undefined;
    if (maybe?.name === "AbortError") {
      logger.warn("Loki readiness check timed out");
    } else {
      logger.warn({ err }, "Loki readiness check error");
    }
    return false;
  } finally {
    timerClear(to);
  }
}

// Periodic supervisor: probes Loki and flips logging on/off accordingly.
const LOKI_CHECK_INTERVAL_MS = 15_000; // adjust as desired

function startLokiSupervisor() {
  if (!env.LOKI_URL) return; // nothing to do

  lokiState.usedUrl = String(env.LOKI_URL || "");

  const checkOnce = async () => {
    try {
      const ok = await initLoki(3000);
      lokiState.probeLastOk = ok;

      if (ok && !lokiState.enabled) {
        // Loki is reachable and not currently enabled -> enable logging
        await enableLokiLogger();
      } else if (!ok && lokiState.enabled) {
        // Loki became unavailable -> disable logging
        disableLokiLogger("Loki readiness check failed");
      }
    } catch (err) {
      lokiState.probeLastOk = false;
      lokiState.lastError = err;
      if (lokiState.enabled) {
        disableLokiLogger(err);
      } else {
        console.warn("Loki supervisor probe error", err);
      }
    }
  };

  // Initial check (don’t block startup)
  void checkOnce();

  const intervalFn = (
    globalThis as unknown as {
      setInterval?: (handler: () => void, timeout?: number) => unknown;
    }
  ).setInterval;
  if (typeof intervalFn !== "function") return;

  intervalFn(() => {
    void checkOnce();
  }, LOKI_CHECK_INTERVAL_MS);
}

// Kick off the supervisor
startLokiSupervisor();
