const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const validator = require("@middy/validator");
const createError = require("http-errors");
const inputSchema = require("./schema");
const PlacesTable = require("../PlacesTable");

const placesTable = new PlacesTable();

async function put(event) {
  const { body, pathParameters } = event;
  const { slug, county } = pathParameters;

  try {
    await placesTable.putPlace({ slug, county }, body);
  } catch (e) {
    return new createError(e.statusCode);
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(put)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
