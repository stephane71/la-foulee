import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import FileManager from "../../commons/FileManager";
import getS3RecordInfo from "../../commons/getS3RecordInfo";
import getEventLocation from "./getEventLocation";
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

  // 2. Update event location
  const { department, city } = await getEventLocation(event);
  const newEvent = { ...event, department, city };

  // 3. Upload new event
  return FileManager.uploadToBucket(
    key,
    JSON.stringify(newEvent),
    process.env.S3_DESTINATION
  );
}

export const handler = middy(updateEventLocationMiddleware)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
