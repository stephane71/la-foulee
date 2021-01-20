const getFormattedDepartmentCode = require("../getFormattedDepartmentCode");

describe("scraper:update-event-location:getFormattedDepartmentCode", () => {
  test("Should throw an error on wrong argument type", () => {
    expect(() => getFormattedDepartmentCode(3)).toThrowError();
  });
  test("Should throw an error on wrong argument value", () => {
    expect(() => getFormattedDepartmentCode("test")).toThrowError();
    expect(() => getFormattedDepartmentCode("test3")).toThrowError();
    expect(() => getFormattedDepartmentCode("990")).toThrowError();
  });
  test("Should return a formatted department code", () => {
    expect(getFormattedDepartmentCode("006")).toEqual("06");
    expect(getFormattedDepartmentCode("06")).toEqual("06");
    expect(getFormattedDepartmentCode("   06")).toEqual("06");
  });
});
