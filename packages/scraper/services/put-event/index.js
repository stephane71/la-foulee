import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import createError from "http-errors";
import FileManager from "../../commons/FileManager";
import getS3RecordInfo from "../../commons/getS3RecordInfo";
import inputSchema from "../../commons/s3Record.schema";
import putEvent from "./putEvent";

/**
 * Extract events from FFA html document stored in S3
 * @param {Object} S3event
 * @param {Object[]} S3event.Records
 *
 * More on S3 events structure
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html
 *
 */
async function putEventHandler(S3event) {
  // 1. Get event from S3 json document
  const { key, bucket } = getS3RecordInfo(S3event.Records[0]);
  const file = await FileManager.getFile(key, bucket);
  const event = JSON.parse(file);

  console.log("[La Foulee] Log: putEvent", event);

  try {
    await putEvent(event);
  } catch (error) {
    console.log("[La Foulee] Error ---- putEvent");
    if (error.response) {
      const { data, status } = error.response;
      console.log(data);
      console.log(status);
      return createError(status);
    }
    console.log(error.config);
    console.log(error.message);
    console.log(error.toJSON());
  }
}

export const handler = middy(putEventHandler)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
