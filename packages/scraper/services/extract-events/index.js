const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const validator = require("@middy/validator");
const FileManager = require("../../commons/FileManager");
const getS3RecordInfo = require("../../commons/getS3RecordInfo");
const extractEvents = require("./extractEvents");
const { input: inputSchema } = require("./schemas");

/**
 * Extract events from FFA html document stored in S3
 * @param {Object} event
 * @param {Object} event.Records
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

module.exports.handler = middy(extractEventsFromHtmlDocument)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
