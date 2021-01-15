const Ajv = require("ajv").default;
const isFFADepartmentKeyword = require("../isFFADepartment");

const schema = {
  type: "object",
  required: ["variable"],
  properties: {
    variable: { type: "string", isDepartment: true },
  },
};

describe("AJVKeywords:isFFADepartment", () => {
  it("Validate only on departments listed", () => {
    const ajv = new Ajv({
      keywords: [isFFADepartmentKeyword.definition],
    });

    const validate = ajv.compile(schema);
    const wrongDep = validate({ variable: "wrong department value" });
    const rightDep = validate({ variable: "071" });
    const intDep = validate({ variable: 973 });

    expect(wrongDep).toBe(false);
    expect(rightDep).toBe(true);
    expect(intDep).toBe(false);
  });
});
