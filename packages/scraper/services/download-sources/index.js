const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const isFFADepartmentKeyword = require("../../AJVKeywords/isFFADepartment");
const { input: inputSchema } = require("./schemas");
const downloadDepartmentPage = require("./downloadFFADepartmentPage");

/**
 * Download source page from FFA website
 * @param {object} event
 * @param {object} event.pathParameters
 *
 */
async function downloadSource(event) {
  const { year, dep } = event.pathParameters;

  const data = await downloadDepartmentPage(year, dep);
  console.log(data);

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
