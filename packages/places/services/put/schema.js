module.exports = {
  type: "object",
  required: ["pathParameters", "body"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["slug"],
      properties: {
        slug: { type: "string" },
      },
    },
    body: {
      type: "object",
    },
  },
};
