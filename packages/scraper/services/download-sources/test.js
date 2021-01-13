const Ajv = require("ajv").default;

function validateDep(schema, data) {
  console.log("validate data", data, "schema is", schema);
  return ["test", "bonjour"].includes(data);
}

const keywordDef = {
  keyword: "isDepartment",
  type: "string",
  schemaType: "boolean",
  validate: validateDep,
  errors: false,
};

const schema = {
  type: "object",
  required: ["variable"],
  properties: {
    variable: { type: "string", isDepartment: true },
  },
};

console.log(require("ajv-keywords/dist/definitions/typeof")());

const ajv = new Ajv({
  keywords: [require("ajv-keywords/dist/definitions/typeof")(), keywordDef],
});
//ajv.addKeyword(keywordDef);
const validate = ajv.compile(schema);
const result = validate({ variable: "test de Charolles" });

console.log(result);
console.log(validate.errors);
