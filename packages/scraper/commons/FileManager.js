import AWS from "aws-sdk";

// We don't need to add credentials (ACCESS_KEY_ID && SECRET_ACCESS_KEY)
// because the IAM policies present in the serverless.yml take care of it.
const s3 = new AWS.S3();

class FileManager {
  static uploadToBucket(fileName, data, bucket) {
    const params = {
      Key: fileName,
      Body: data,
      Bucket: bucket,
    };

    return new Promise((resolve) => {
      s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
        resolve();
      });
    });
  }

  static getFile(key, bucket) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    return new Promise((resolve) => {
      s3.getObject(params, function (s3Err, data) {
        if (s3Err) throw s3Err;
        // data.Body is a Buffer.
        // see: https://docs.aws.amazon.com/fr_fr/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
        resolve(data.Body.toString());
      });
    });
  }
}

export default FileManager;
