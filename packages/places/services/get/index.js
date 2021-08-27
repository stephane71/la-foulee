const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
// const createError = require("http-errors");
const inputSchema = require("./schema");
const PlacesTable = require("../PlacesTable");

const placesTable = new PlacesTable();

async function get(event) {
  const { slug } = event.pathParameters;

  const place = await placesTable.getPlace(slug);

  return {
    statusCode: 200,
    body: JSON.stringify(place),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(get)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
