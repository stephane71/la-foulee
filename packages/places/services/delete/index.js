import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import inputSchema from "./schema";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function deleteItem(event) {
  const { slug, county } = event.pathParameters;

  try {
    await placesTable.deletePlace({ slug, county });
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
