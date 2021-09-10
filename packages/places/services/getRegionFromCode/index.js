import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import inputSchema from "./schema";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function getRegionFromCode(event) {
  const { code } = event.pathParameters;

  const places = await placesTable.getRegionFromCode(code);

  if (!places.length) {
    throw new createError.NotFound();
  }

  if (places.length > 1) {
    throw new createError.InternalServerError(
      "[La Foulee] getRegionFromCode: More than one department found"
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify(places[0]),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(getRegionFromCode)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
