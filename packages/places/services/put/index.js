const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const validator = require("@middy/validator");
// const createError = require("http-errors");
const inputSchema = require("./schema");

function put(event) {
  const { body, pathParameters } = event;
  const { slug } = pathParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ body, slug }),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(put)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
