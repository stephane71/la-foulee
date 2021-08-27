const AWS = require("aws-sdk");

const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION;

class DynamoDB {
  constructor() {
    this.dbDocClient = new AWS.DynamoDB.DocumentClient({ region: REGION });
  }

  /*
   * ITEMS
   */

  request(type, params) {
    return new Promise((resolve, reject) => {
      this.dbDocClient[type](params, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  }

  getItem(key) {
    const params = {
      TableName: TABLE_NAME,
      Key: key,
    };

    return this.request("get", params).then(({ Item }) => Item);
  }

  putItem(key, data) {
    const params = {
      TableName: TABLE_NAME,
      Item: { ...key, ...data },
    };

    return this.request("put", params);
  }
}

module.exports = DynamoDB;
