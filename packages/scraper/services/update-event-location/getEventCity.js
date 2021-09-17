import { slugIt } from "@la-foulee/utils";
import getCity from "./getCity";

/**
 * Get the event city from FFA city info in La Foulée Places API
 * @param {Object} event
 * @param {string} event.city
 * @param {Object} department
 * @param {string} department.slug
 *
 * @returns {Object} city
 *
 * */
async function getEventCity(event, department) {
  const { city } = event;
  const { slug: slugDepartment } = department;

  const slug = slugIt(city, { lower: true });
  return getCity(slug, slugDepartment);
}

export default getEventCity;
