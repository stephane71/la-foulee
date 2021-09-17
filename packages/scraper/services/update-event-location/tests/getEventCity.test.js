const getEventCity = require("../getEventCity");
//const Errors = require("../../../commons/Errors");

describe("scraper:update-event-location:getEventCity", () => {
  test("Should return an object department", async () => {
    const city = "puteaux";
    const departmentSlug = "hauts-de-seine";

    const place = await getEventCity({ city: city }, { slug: departmentSlug });

    expect(place.slug).toEqual("puteaux");
  });
});
