const schema = {
  type: "object",
  required: ["Records"],
  properties: {
    Records: {
      type: "array",
      items: {
        type: "object",
      },
    },
  },
};

export default schema;
