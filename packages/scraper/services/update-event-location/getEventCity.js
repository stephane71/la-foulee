const slugLib = require("slug");
const getPlace = require("./getPlace");

/**
 * Get the event city from FFA city info in La Foulée Places API
 * @param {Object} event
 * @param {string} event.city
 * @param {Object} event.address
 * @param {Object} event.countySlug
 *
 * @returns {Object} event
 * @returns {Object} event.location
 *
 * */
module.exports = async function getEventCity(event) {
  const { city, address, countySlug } = event;
  if (!countySlug) return event;

  const input = `${countySlug}_${slugLib(city, { lower: true })}`;

  let res = {};
  const errorMessage = `[La Foulée] updateEventCity | Can't find slug in La Foulée Places API: ${input}`;
  try {
    res = await getPlace(input);
    if (!res.data) {
      console.error(errorMessage);
      return event;
    }
  } catch (e) {
    if (e.response && e.response.status === 404) {
      console.warn(errorMessage);
    }
    console.error(e);
    return event;
  }

  const { slug, location, name, postCode } = res.data;
  return {
    ...event,
    placeSlug: slug,
    countySlug,
    location,
    address: {
      ...address,
      city: name,
      postCode,
    },
  };
};
