import { getJSONSchemaTypeFromDynamoDBType } from "@la-foulee/utils";
import crudParameters from "../../commons/crudParameters.schema";
import { ATTRIBUTE_DEFINITION } from "../../commons/table.definition";

const requiredAttributes = Object.values(ATTRIBUTE_DEFINITION).map(
  ({ name }) => name
);
const properties = Object.values(ATTRIBUTE_DEFINITION).reduce((prev, next) => {
  const { name, type } = next;
  return {
    ...prev,
    [name]: getJSONSchemaTypeFromDynamoDBType(type),
  };
}, {});

const schema = {
  type: "object",
  required: ["pathParameters", "body"],
  properties: {
    pathParameters: crudParameters,
    body: {
      type: "object",
      required: requiredAttributes,
      properties,
    },
  },
};

export default schema;
