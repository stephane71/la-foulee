const getGeohashFromLocation = require("../getGeohashFromLocation");

const MOCK_COORDINATES = {
  lat: 48.669,
  lng: -4.329,
  geohash: "gbsu",
};

describe("scraper:update-event-location:getGeohashFromLocation", () => {
  test("Should return a correct geohash", () => {
    const geohash = getGeohashFromLocation(MOCK_COORDINATES);
    expect(geohash).toEqual(MOCK_COORDINATES.geohash);
  });
});
