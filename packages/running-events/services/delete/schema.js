import crudParameters from "../../commons/crudParameters.schema";

const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: crudParameters,
  },
};

export default schema;
