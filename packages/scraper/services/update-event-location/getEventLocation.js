import getEventDepartment from "./getEventDepartment.js";
import getEventCity from "./getEventCity.js";

/**
 * Get event location using La Foulée Places API
 * @param {Object} event
 *
 * @returns {Object} location
 * @returns {Object} location.department
 * @returns {Object} location.city
 *
 * */
async function getEventLocation(event) {
  const department = await getEventDepartment(event);
  const city = await getEventCity(event, department);

  return { department, city };
}

export default getEventLocation;
