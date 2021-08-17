const Ajv = require("ajv").default;
const schema = require("../schema");

describe("Places:put: schema validator", () => {
  it("Should not validate wrong body", () => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const pathParameters = { slug: "test" };

    const noBody = validate({ pathParameters });
    const emptyBody = validate({ pathParameters, body: null });
    const notObjectBody = validate({ pathParameters, body: 973 });

    expect(noBody).toBe(false);
    expect(emptyBody).toBe(false);
    expect(notObjectBody).toBe(false);
  });

  it("Should validate body", () => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const pathParameters = { slug: "test" };

    const eventValidation = validate({
      pathParameters,
      body: { test: "hello world" },
    });

    expect(eventValidation).toBe(true);
  });
});
