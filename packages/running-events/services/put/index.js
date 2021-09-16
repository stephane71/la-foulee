import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import createError from "http-errors";
import Table from "../../commons/Table";
import inputSchema from "./schema";

const table = new Table();

async function put(event) {
  const { body, pathParameters } = event;
  const { keyword, date } = pathParameters;

  try {
    await table.putRunningEvent({ keyword, date }, body);
  } catch (e) {
    console.log(e);
    return createError(e.statusCode);
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(put)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
