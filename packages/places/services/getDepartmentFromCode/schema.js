const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["code"],
      properties: {
        code: {
          type: "string",
          minLength: 2,
          maxLength: 3,
          pattern: "\\d{2,3}|2A|2a|2B|2b",
        },
      },
    },
  },
};

export default schema;
