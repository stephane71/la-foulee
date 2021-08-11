module.exports = {
  type: "object",
  required: ["pathParameters"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["slug"],
      properties: {
        slug: { type: "string" },
      },
    },
  },
};
