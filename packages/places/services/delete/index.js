const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
// const createError = require("http-errors");
const inputSchema = require("./schema");

function deleteItem() {}

module.exports.handler = middy(deleteItem)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
