const crudPathParameters = require("../pathParameters.schema");

const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: { ...crudPathParameters },
  },
};

export default schema;
