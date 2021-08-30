const crudPathParameters = require("../pathParameters.schema");

module.exports = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: { ...crudPathParameters },
    body: {
      type: "object",
    },
  },
};
