const handler = require("../index").handler;

describe("Places:put: handler", () => {
  it("Should get a parsed body", async () => {
    const event = {
      headers: {
        "Content-Type": "application/json", // It is important that the request has the proper content type.
      },
      body: JSON.stringify({ foo: "bar", name: "Semi de Boulogne" }),
      pathParameters: {
        slug: "test",
      },
    };

    const data = await handler(event, {});
    expect(data).toHaveProperty("body");
    const body = JSON.parse(data.body);
    expect(body).toEqual({ foo: "bar", name: "Semi de Boulogne" });
  });
});
