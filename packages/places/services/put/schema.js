import crudPathParameters from "../pathParameters.schema";

const schema = {
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

export default schema;
