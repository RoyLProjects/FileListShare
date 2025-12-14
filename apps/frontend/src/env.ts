import { z } from "zod";
export const env = {
  VITE_API_URL: z
    .string()
    .url()
    .default("http://localhost:3001")
    .parse(import.meta.env.VITE_API_URL),
  FRONTEND_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .parse(import.meta.env.VITE_FRONTEND_URL),
};
