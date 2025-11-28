import { ResultHandler, EndpointsFactory } from "express-zod-api";
import { z } from "zod";
import { logger } from "./log.js";
import { Prisma } from "../../prisma/app/generated/app/index.js";

// Shape of your error responses
const ErrorResponseSchema = z.object({
  success: z.literal(false),
  statusCode: z.number(),
  message: z.string(),
});

export class CustomHttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = new.target.name;
  }
}

//Gebruiker is niet ingelogd
export class UnauthorizedError extends CustomHttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

//Gebruiker heeft niet de juiste rechten
export class ForbiddenError extends CustomHttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

//Opgevraagde resource bestaat niet
export class NotFoundError extends CustomHttpError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

//status van resource conflicteert met de actie
export class ConflictError extends CustomHttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

// internale server fout
export class InternalServerError extends CustomHttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

export class BadRequestError extends CustomHttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

function ensureCustomHttpError(error: unknown): CustomHttpError {
  if (error instanceof CustomHttpError) return error;

  const e = error instanceof Error ? error : new Error(String(error));

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2002":
        return new ConflictError("A record with this value already exists.");

      case "P2003":
        return new ConflictError(
          "This record is linked and cannot be deleted or updated.",
        );

      case "P2025":
        return new NotFoundError("The requested record does not exist.");

      case "P2000":
        return new BadRequestError(
          "Value provided is too long for this field.",
        );

      default:
        return new InternalServerError("Database error.");
    }
  }
  logger.error(e.message);
  // Fallback to generic internal server error (never return error details to client)
  return new InternalServerError();
}

export const resultHandler = new ResultHandler({
  // Positive responses: wrap in { success: true, data: ... }
  positive: (output) => ({
    schema: z.object({
      success: z.literal(true),
      data: output,
    }),
    mimeType: "application/json",
  }),

  // Negative schema: define the error response shape
  negative: ErrorResponseSchema,

  // Negative + positive handler in one place
  handler: ({ error, output, response }) => {
    // 🔹 Error path
    if (error) {
      const httpError = ensureCustomHttpError(error);
      const statusCode = httpError.statusCode ?? 500;
      const message = httpError.message || "An error occurred";

      response.status(statusCode).json({
        success: false,
        statusCode,
        message,
      });
      return;
    }

    // 🔹 Success path
    // `output` is whatever your endpoint handler returned,
    // already validated against your `output` schema.
    response.status(200).json({
      success: true,
      data: output,
    });
  },
});

// Create a custom endpoints factory that uses our result handler
export const endpointsFactory = new EndpointsFactory(resultHandler);
