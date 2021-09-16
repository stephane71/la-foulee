function getJSONSchemaTypeFromDynamoDBType(jsonSchemaType) {
  if (jsonSchemaType === "S") {
    return "string";
  }
  if (jsonSchemaType === "N") {
    return "number";
  }
  return "string";
}

export default getJSONSchemaTypeFromDynamoDBType;
