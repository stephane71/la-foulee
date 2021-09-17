import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import isFFADepartmentKeyword from "../../AJVKeywords/isFFADepartment";
import FileManager from "../../commons/FileManager";
import inputSchema from "./schemas";
import downloadDepartmentPage from "./downloadFFADepartmentPage";

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

export const handler = middy(downloadSource)
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
