import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock modules
vi.mock("../../lib/db.js", () => ({
  getDatabaseAppStatus: vi.fn(),
  getDatabaseAuthStatus: vi.fn(),
}));

vi.mock("../../lib/redis.js", () => ({
  getRedisClientStatus: vi.fn(),
}));

vi.mock("../../lib/log.js", () => ({
  getLokiStatus: vi.fn(),
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Import mocked functions
import { getRedisClientStatus } from "../../lib/redis.js";
import { getLokiStatus, logger } from "../../lib/log.js";
import { HealthService } from "../healthService.js";
import { getDatabaseAppStatus, getDatabaseAuthStatus } from "../../lib/db.js";

describe("HealthService.checkHealth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true for all services when everything is healthy", async () => {
    vi.mocked(getDatabaseAppStatus).mockResolvedValue(true);
    vi.mocked(getDatabaseAuthStatus).mockResolvedValue(true);
    vi.mocked(getRedisClientStatus).mockResolvedValue(true);
    vi.mocked(getLokiStatus).mockReturnValue({
      enabled: true,
      usedUrl: null,
      probeLastOk: true,
      transportErrorCount: 0,
    });

    const result = await HealthService.checkHealth();

    expect(result).toEqual({
      database: true,
      redis: true,
      loki: true,
    });

    expect(logger.info).toHaveBeenCalledWith("Health check endpoint called");
  });

  it("returns false for any failing dependency", async () => {
    vi.mocked(getDatabaseAppStatus).mockResolvedValue(false);
    vi.mocked(getDatabaseAuthStatus).mockResolvedValue(false);
    vi.mocked(getRedisClientStatus).mockResolvedValue(false);
    vi.mocked(getLokiStatus).mockReturnValue({
      enabled: false,
      usedUrl: null,
      probeLastOk: false,
      transportErrorCount: 0,
    });

    const result = await HealthService.checkHealth();

    expect(result).toEqual({
      database: false,
      redis: false,
      loki: false,
    });
  });

  it("returns all false if an exception occurs", async () => {
    vi.mocked(getDatabaseAppStatus).mockRejectedValue(
      new Error("connection failed"),
    );

    const result = await HealthService.checkHealth();

    expect(result).toEqual({
      database: false,
      redis: false,
      loki: false,
    });

    expect(logger.error).toHaveBeenCalledWith("Health check failed");
  });
});
