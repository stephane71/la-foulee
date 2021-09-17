const getEventDepartment = require("../getEventDepartment");
const Errors = require("../../../commons/Errors");

describe("scraper:update-event-location:getEventDepartment", () => {
  test("Should return an object department", async () => {
    const department = await getEventDepartment({ dep: "92" });

    expect(department.code).toEqual("92");
    expect(department.name).toEqual("Hauts-de-Seine");
    expect(department.county).toEqual("ile-de-france");
  });

  test("Should trigger a 404", async () => {
    try {
      const department = await getEventDepartment({ dep: "222" });
    } catch (e) {
      console.log(e.response.status);
      expect(e.response.status).toEqual(404);
    }
  });

  test("Should trigger a validation error", async () => {
    try {
      await getEventDepartment({ dep: "10000" });
    } catch (e) {
      expect(e.code).toEqual(Errors.InvalidFFADepartmentValue.code);
    }
  });
});
