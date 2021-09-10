import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import inputSchema from "./schema";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function getPlaces(event) {
  const { pathParameters, queryStringParameters } = event;
  const { slug } = pathParameters;
  const type = queryStringParameters?.type;

  const places = await placesTable.getPlaces(slug, type);

  return {
    statusCode: 200,
    body: JSON.stringify(places),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

export const handler = middy(getPlaces)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
