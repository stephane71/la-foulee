import placesTypes from "../../scripts/placesTypes.json";

/**
 * AJV Validation function
 * See: https://ajv.js.org/docs/keywords.html#define-keyword-with-validation-function
 * @param schema
 * @param {string} data
 * @returns {boolean}
 */
function isPLaceType(schema, data) {
  return !!placesTypes[data];
}

const VALIDATOR_KEYWORD = "isPlaceType";

const validator = {
  name: VALIDATOR_KEYWORD,
  definition: {
    keyword: VALIDATOR_KEYWORD,
    type: "string",
    schemaType: "boolean",
    validate: isPLaceType,
    errors: false,
  },
};

export default validator;
