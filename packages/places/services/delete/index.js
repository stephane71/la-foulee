const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const createError = require("http-errors");
const inputSchema = require("./schema");
const PlacesTable = require("../PlacesTable");

const placesTable = new PlacesTable();

async function deleteItem(event) {
  const { slug, county } = event.pathParameters;

  try {
    await placesTable.deletePlace({ slug, county });
  } catch (e) {
    return new createError(e.statusCode);
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(deleteItem)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
