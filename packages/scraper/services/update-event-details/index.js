import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
//import createError from "http-errors";
import FileManager from "../../commons/FileManager";
import getS3RecordInfo from "../../commons/getS3RecordInfo";
import inputSchema from "./schema";
import getEventDetails from "./getEventDetails";
import getEventType from "./getEventType";
import getLaFouleeEvent from "./getLaFouleeEvent";

/**
 * Extract events from FFA html document stored in S3
 * @param {Object} S3event
 * @param {Object[]} S3event.Records
 *
 * More on S3 events structure
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html
 *
 */
async function updateEventDetails(S3event) {
  // 1. Get event from S3 json document
  const { key, bucket } = getS3RecordInfo(S3event.Records[0]);
  const file = await FileManager.getFile(key, bucket);
  const event = JSON.parse(file);

  console.log(
    "[La Foulee] Log: updateEventDetails: process event",
    JSON.stringify(event)
  );

  const eventWithDetails = await getEventDetails(event);
  const eventType = getEventType(event);

  const eventFinal = getLaFouleeEvent({ ...eventWithDetails, type: eventType });

  console.log(
    "[La Foulee] Log: push object",
    key,
    " to bucket: ",
    process.env.S3_DESTINATION
  );

  // 3. Upload new event
  return FileManager.uploadToBucket(
    key,
    JSON.stringify(eventFinal),
    process.env.S3_DESTINATION
  );
}

export const handler = middy(updateEventDetails)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
