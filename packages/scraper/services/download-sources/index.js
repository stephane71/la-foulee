const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const createError = require("http-errors");
const isFFADepartmentKeyword = require("../../AJVKeywords/isFFADepartment");
const FileManager = require("../../commons/FileManager");
const { input: inputSchema } = require("./schemas");
const downloadDepartmentPage = require("./downloadFFADepartmentPage");

/**
 * Download source page from FFA website
 * @param {Object} event
 * @param {Object} event.pathParameters
 *
 */
async function downloadSource(event) {
  const { year, dep } = event.pathParameters;

  // 1. Download document
  let data = "";
  try {
    data = await downloadDepartmentPage(year, dep);
  } catch (e) {
    return new createError.NotFound("This page could not be downloaded");
  }

  // 2. Store document in S3
  try {
    await FileManager.uploadToBucket(
      `${dep}.html`,
      data,
      process.env.S3_DESTINATION
    );
  } catch (e) {
    return new createError.InternalServerError(
      "Problem when try to upload to bucket"
    );
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

module.exports.handler = middy(downloadSource)
  .use(
    validator({
      inputSchema,
      ajvOptions: {
        keywords: {
          [isFFADepartmentKeyword.name]: isFFADepartmentKeyword.definition,
        },
      },
    })
  )
  .use(httpErrorHandler());
