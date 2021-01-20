const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const FileManager = require("../../commons/FileManager");
const getS3RecordInfo = require("../../commons/getS3RecordInfo");
const updateEventLocation = require("./updateEventLocation");
const inputSchema = require("./schemas");

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
  const eventWithLocation = await updateEventLocation(event);

  // 3. Upload new event
  return FileManager.uploadToBucket(
    key,
    JSON.stringify(eventWithLocation),
    process.env.S3_DESTINATION
  );
}

module.exports.handler = middy(updateEventLocationMiddleware)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
