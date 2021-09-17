import FFA_DEPARTMENTS from "../commons/FFADepartements";

/**
 * AJV Validation function to check if a string is a FFA department
 * See: https://ajv.js.org/docs/keywords.html#define-keyword-with-validation-function
 * @param schema
 * @param {string} data
 * @returns {boolean}
 */
function isDepartment(schema, data) {
  return FFA_DEPARTMENTS.includes(data);
}

const KEYWORD_NAME = "isDepartment";

const validator = {
  name: KEYWORD_NAME,
  definition: {
    keyword: KEYWORD_NAME,
    type: "string",
    schemaType: "boolean",
    validate: isDepartment,
    errors: false,
  },
};

export default validator;
