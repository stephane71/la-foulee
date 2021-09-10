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

    if (!operation !== !rangeKey) {
      throw new Error(
        "[La Foulee] DynamoDB:queryGSI: You must provide a range key value AND an operation OR neither"
      );
    }

    const baseExpression = "#hashKey = :hashKey";
    const rangeKeyAttributeName = operation
      ? { "#rangeKey": rangeKeyName }
      : {};
    const rangeKeyAttributeValue = operation ? { ":rangeKey": rangeKey } : {};

    const params = {
      TableName: TABLE_NAME,
      IndexName: name,
      KeyConditionExpression:
        baseExpression +
        (operation ? ` and #rangeKey ${operation} :rangeKey` : ""),
      ExpressionAttributeNames: {
        "#hashKey": hashKeyName,
        ...rangeKeyAttributeName,
      },
      ExpressionAttributeValues: {
        ":hashKey": hashKey,
        ...rangeKeyAttributeValue,
      },
    };

    const res = await this.request("query", params);
    return res.Items;
  }
}

export default DynamoDB;
