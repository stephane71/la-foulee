import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import inputSchema from "./schema";
import Table from "../../commons/Table";

const table = new Table();

async function get(event) {
  const { date, keyword } = event.pathParameters;

  const place = await table.getRunningEvent({ keyword, date });

  if (!place) {
    throw new createError.NotFound();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ date, keyword }),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(get)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
