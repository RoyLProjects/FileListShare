import { EndpointsFactory, ResultHandler } from "express-zod-api"; // pad aanpassen
import { CallbackOauthResponseSchema } from "../schemas/dashboard/dropboxSchema.js";
import z from "zod";

export const redirectResultHandler = new ResultHandler({
  positive: {
    statusCode: 302,
    mimeType: null, // geen body, alleen redirect
    schema: CallbackOauthResponseSchema,
  },
  negative: {
    statusCode: 500,
    mimeType: "application/json",
    schema: z.object({ error: z.string() }),
  },
  handler: ({ response, error, output }) => {
    if (error) {
      return void response
        .status(500)
        .json({ error: error.message ?? "Unknown error" });
    }

    // TS ziet output als unknown → casten naar het schema-type
    const { url } = output as { url: string };

    return void response.redirect(url);
  },
});

export const redirectEndpointsFactory = new EndpointsFactory(
  redirectResultHandler,
);
