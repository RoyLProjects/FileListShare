// Build-time OpenAPI export naar bestand voor client-generatie
import { writeFileSync } from "node:fs";
import path from "node:path";
import { Documentation, createConfig } from "express-zod-api";
import { routing } from "./api/routing.js";

(async () => {
  const config = createConfig({
    cors: true,
    logger: {
      level: "info",
      color: true,
    },
  });

  const documentation = new Documentation({
    routing: routing,
    config,
    version: "1.0.0",
    title: "FileListShare API",
    serverUrl: "http://localhost:3001",
  });

  const openApiDocument = documentation.getSpecAsJson();

  const out = path.resolve(process.cwd(), "openapi.json");

  // Parse and modify to ensure OpenAPI 3.0.x compatibility if needed
  const spec =
    typeof openApiDocument === "string"
      ? JSON.parse(openApiDocument)
      : openApiDocument;

  // Force OpenAPI 3.0.3 for better compatibility
  //spec.openapi = "3.0.3";

  writeFileSync(out, JSON.stringify(spec, null, 2));
  console.log("OpenAPI spec geschreven naar:", out);
})();
