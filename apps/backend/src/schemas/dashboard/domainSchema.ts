import { z } from "zod";

const zId = z.string().trim().pipe(z.uuid("Must be a valid UUID"));
export const listId = zId;
export const teamId = zId;
export const linkId = zId;
export const itemId = zId;
export const teamMemberId = zId;
export const storageId = zId;
export const userId = z.string().trim();

export const urlSchema = z.string().trim().url("Must be a valid URL");
export const pathSchema = z
  .string()
  .trim()
  .min(1, "Path cannot be empty")
  .regex(/^\/.*$/, "Path must start with '/'")
  .superRefine((value, ctx) => {
    if (value.includes("//")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Path cannot contain double slashes ('//')",
      });
    }
  })
  .default("/");

export const token = z
  .string()
  .trim()
  .min(7, "Token must be at least 7 characters")
  .max(100, "Token must be at most 100 characters");

export const page = z.coerce
  .number()
  .int()
  .min(1, "Page must be at least 1")
  .max(999, "Page must be at most 999")
  .default(1);

export const pageSize = z.coerce
  .number()
  .int()
  .min(1, "Page size must be at least 1")
  .max(1000, "Page size must be at most 1000")
  .default(15);

export const itemnumber = z.coerce
  .number()
  .int()
  .min(1, "Item number must be at least 1");

export const comment = z
  .string()
  .max(1000, "Comment must be at most 1000 characters")
  .nullable();

export const description = z
  .string()
  .max(5000, "Description must be at most 5000 characters");

const forbiddenChars = /[\/\\<>:"|?*]/;
//matches dropbox rules for folder names
export const title = z
  .string()
  .min(1, "Title is required")
  .max(255, "Title must be at most 255 characters")
  .refine((val) => !forbiddenChars.test(val), {
    message: "Title contains invalid characters for a Dropbox folder name",
  })
  .refine((val) => !val.endsWith(" "), {
    message: "Title must not end with a space",
  });

export const itemstatus = z.enum(["published", "draft"]);

export const fileName = z
  .string()
  .min(1, "File name is required")
  .max(255, "File name must be at most 255 characters");
export const fileSize = z.coerce
  .number()
  .int()
  .min(1, "File size must be greater than 0");

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be at most 100 characters");
