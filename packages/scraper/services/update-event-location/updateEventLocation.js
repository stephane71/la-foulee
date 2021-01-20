const getGeohashFromLocation = require("./getGeohashFromLocation");
const getEventDepartment = require("./getEventDepartment.js");
const getEventCity = require("./getEventCity.js");

/**
 * Update event location using Google Maps && Algolia Places API
 * @param {Object} event
 *
 * @returns {Object} event
 *
 * */
module.exports = async function updateEventLocation(event) {
  const { countySlug, address } = await getEventDepartment(event);
  const updatedCityEvent = await getEventCity({
    ...event,
    countySlug,
    address,
  });
  const geohash = getGeohashFromLocation(updatedCityEvent.location);

  return { ...updatedCityEvent, geohash };
};
