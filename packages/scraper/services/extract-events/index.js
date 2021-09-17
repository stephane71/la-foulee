import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import FileManager from "../../commons/FileManager";
import getS3RecordInfo from "../../commons/getS3RecordInfo";
import extractEvents from "./extractEvents";
import inputSchema from "./schemas";

/**
 * Extract events from FFA html document stored in S3
 * @param {Object} event
 * @param {Object[]} event.Records
 *
 * More on S3 events structure
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html
 *
 */
async function extractEventsFromHtmlDocument(event) {
  // 1. Get file from S3
  const { key, bucket } = getS3RecordInfo(event.Records[0]);
  const file = await FileManager.getFile(key, bucket);

  // 2. Extract events from HTML document
  const events = await extractEvents(file);

  // 3. Upload each events in a dedicated JSON document in S3
  const promises = events.map((event) =>
    FileManager.uploadToBucket(
      `${event.keyword}-${event.date}.json`,
      JSON.stringify(event),
      process.env.S3_DESTINATION
    )
  );

  return Promise.all(promises);
}

export const handler = middy(extractEventsFromHtmlDocument)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
