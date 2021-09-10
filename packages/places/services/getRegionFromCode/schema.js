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
          maxLength: 2,
          pattern: "\\d{2}",
        },
      },
    },
  },
};

export default schema;
