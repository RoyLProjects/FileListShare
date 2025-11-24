import createClient from "openapi-fetch";
import type { paths } from "api-client";
import { env } from "../env";

export const Api = createClient<paths>({
  baseUrl: env.VITE_API_URL,
  credentials: "include",
});
