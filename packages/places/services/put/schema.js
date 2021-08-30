const crudPathParameters = require("../pathParameters.schema");

module.exports = {
  type: "object",
  required: ["pathParameters", "body"],
  properties: {
    pathParameters: { ...crudPathParameters },
    body: {
      type: "object",
      required: ["slug", "county", "name", "code", "type"],
      properties: {
        slug: { type: "string" },
        county: { type: "string" },
        name: { type: "string" },
        code: { type: "string" },
        type: { type: "string" },
      },
    },
  },
};
