const schema = {
  type: "object",
  required: ["county", "slug"],
  properties: {
    county: { type: "string" },
    slug: { type: "string" },
  },
};

export default schema;
