import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import Table from "../../commons/Table";
import inputSchema from "./schema";

const table = new Table();

async function deleteItem(event) {
  const { keyword, date } = event.pathParameters;

  try {
    await table.deleteRunningEvent({ keyword, date });
  } catch (e) {
    return createError(e.statusCode);
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(deleteItem)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
