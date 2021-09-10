import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function getRegionList() {
  const places = await placesTable.getRegionList();

  if (!places) {
    throw new createError.NotFound();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(places),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(getRegionList).use(httpErrorHandler());
