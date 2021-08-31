import crudPathParameters from "../pathParameters.schema";
import validator from "./placeType.validator";

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
        type: {
          type: "string",
          [validator.name]: true,
        },
      },
    },
  },
};

export default schema;
