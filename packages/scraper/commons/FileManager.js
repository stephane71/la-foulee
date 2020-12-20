const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = class FileManager {
  static uploadToBucket(fileName, data, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: data
    };

    return new Promise((resolve) => {
      s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
        resolve();
      });
    });
  }

  static getFile(key, bucket) {
    const params = {
      Bucket: bucket,
      Key: key
    };

    return new Promise((resolve) => {
      s3.getObject(params, function(s3Err, data) {
        if (s3Err) throw s3Err;
        // data.Body is a Buffer.
        // see: https://docs.aws.amazon.com/fr_fr/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
        resolve(data.Body.toString());
      });
    });
  }
};
