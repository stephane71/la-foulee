const getDepartmentObject = require("../getDepartmentObject");
const departments = require("../../../commons/departments.json");

describe("scraper:update-event-location:getDepartmentObject", () => {
  test("Should return null when provide empty string argument", () => {
    expect(getDepartmentObject("")).toEqual(null);
  });

  test("Should return null when provide wrong type argument", () => {
    expect(getDepartmentObject()).toEqual(null);
    expect(getDepartmentObject(false)).toEqual(null);
    expect(getDepartmentObject(null)).toEqual(null);
    expect(getDepartmentObject(3)).toEqual(null);
  });

  test("Should return null when provide wrong department code", () => {
    expect(getDepartmentObject("233")).toEqual(null);
  });

  test("Should return a valide department object", () => {
    const DEP_CODE = "03";
    const depObject = departments.find(({ code }) => code === DEP_CODE);
    expect(getDepartmentObject(DEP_CODE)).toEqual(depObject);
  });
});
