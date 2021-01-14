/**
 * Get bucket name & object key from S3 record
 * @param {Object} record
 * @param {Object} record.s3
 * */
function getS3RecordInfo(record) {
  const { bucket, object } = record.s3;

  return {
    bucket: bucket.name,
    key: object.key,
  };
}

module.exports = getS3RecordInfo;
