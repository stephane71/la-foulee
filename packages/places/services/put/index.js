import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import createError from "http-errors";
import inputSchema from "./schema";
import placeTypeValidator from "./placeType.validator";
import PlacesTable from "../PlacesTable";

const placesTable = new PlacesTable();

async function put(event) {
  const { body, pathParameters } = event;
  const { slug, county } = pathParameters;

  try {
    await placesTable.putPlace({ slug, county }, body);
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
  .use(
    validator({
      inputSchema,
      ajvOptions: {
        keywords: {
          [placeTypeValidator.name]: placeTypeValidator.definition,
        },
      },
    })
  )
  .use(httpErrorHandler());
