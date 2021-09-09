import AWS from "aws-sdk";

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
      Item: { ...data, ...key },
    };

    return this.request("put", params);
  }

  deleteItem(key) {
    const params = {
      TableName: TABLE_NAME,
      Key: key,
    };

    return this.request("delete", params);
  }

  async queryGSI(gsi, keys, operation) {
    const { name, hashKey: hashKeyName, rangeKey: rangeKeyName } = gsi;
    const { hashKey, rangeKey } = keys;

    const params = {
      TableName: TABLE_NAME,
      IndexName: name,
      KeyConditionExpression: `#hashKey = :hashKey and #rangeKey ${operation} :rangeKey`,
      ExpressionAttributeNames: {
        "#hashKey": hashKeyName,
        "#rangeKey": rangeKeyName,
      },
      ExpressionAttributeValues: {
        ":hashKey": hashKey,
        ":rangeKey": rangeKey,
      },
    };

    const res = await this.request("query", params);
    return res.Items;
  }
}

export default DynamoDB;
