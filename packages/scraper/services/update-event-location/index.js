import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import FileManager from "../../commons/FileManager";
import getS3RecordInfo from "../../commons/getS3RecordInfo";
import getEventDepartment from "./getEventDepartment";
import getEventCity from "./getEventCity";
import inputSchema from "./schemas";

/**
 * Extract events from FFA html document stored in S3
 * @param {Object} S3event
 * @param {Object[]} S3event.Records
 *
 * More on S3 events structure
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html
 *
 */
async function updateEventLocationMiddleware(S3event) {
  // 1. Get event from S3 json document
  const { key, bucket } = getS3RecordInfo(S3event.Records[0]);
  const file = await FileManager.getFile(key, bucket);
  const event = JSON.parse(file);

  let department = {};
  let city = {};

  console.log(
    "[La Foulee] Log: updateEventLocationMiddleware: process event",
    JSON.stringify(event)
  );

  try {
    // DEPARTMENT
    department = await getEventDepartment(event);
    console.log("[La Foulee] Log: department", department.slug);
    // CITY
    city = await getEventCity(event, department);
    console.log("[La Foulee] Log: city", JSON.stringify(city));
  } catch (error) {
    let statusCode = 500;
    let errorSuffix = "/error";

    if (error.response) {
      const { status } = error.response;
      errorSuffix = status === 404 ? "notFound/" : "error/";
      statusCode = status;
    }

    console.log("[La Foulee] Error: updateEventLocationMiddleware");
    console.log(error.message);
    console.log(error.config);

    await FileManager.uploadToBucket(
      `${errorSuffix}${key}`,
      JSON.stringify({ ...event, department, city }),
      process.env.S3_DESTINATION
    );

    return createError(statusCode);
  }

  console.log(
    "[La Foulee] Log: push object",
    key,
    " to bucket: ",
    process.env.S3_DESTINATION
  );

  // 3. Upload new event
  return FileManager.uploadToBucket(
    key,
    JSON.stringify({ ...event, department, city }),
    process.env.S3_DESTINATION
  );
}

export const handler = middy(updateEventLocationMiddleware)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
