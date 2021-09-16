import { getJSONSchemaTypeFromDynamoDBType } from "@la-foulee/utils";
import { ATTRIBUTE_DEFINITION, TABLE_BASE } from "./table.definition";

const { HASH_KEY, RANGE_KEY } = TABLE_BASE;

const HASH_KEY_TYPE = getJSONSchemaTypeFromDynamoDBType(
  ATTRIBUTE_DEFINITION[HASH_KEY].type
);

const RANGE_KEY_TYPE = getJSONSchemaTypeFromDynamoDBType(
  ATTRIBUTE_DEFINITION[HASH_KEY].type
);

module.exports = {
  type: "object",
  required: [HASH_KEY, RANGE_KEY],
  properties: {
    [HASH_KEY]: { type: HASH_KEY_TYPE },
    [RANGE_KEY]: { type: RANGE_KEY_TYPE },
  },
};
