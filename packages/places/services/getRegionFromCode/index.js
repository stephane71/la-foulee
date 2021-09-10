import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import inputSchema from "./schema";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function getRegionFromCode(event) {
  const { code } = event.pathParameters;

  const place = await placesTable.getRegionFromCode(code);

  if (!place) {
    throw new createError.NotFound();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(place),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(getRegionFromCode)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
