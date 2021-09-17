const schema = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["year", "dep"],
      properties: {
        year: { type: "integer", minimum: 2015, maximum: 2025 },
        dep: {
          type: "string",
          minLength: 3,
          maxLength: 3,
          pattern: "\\d{3}",
          isDepartment: true,
        },
      },
    },
  },
};

export default schema;
