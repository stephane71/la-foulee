const getPlace = require("./getPlace");
const getFormattedDepartmentCode = require("./getFormattedDepartmentCode");
const getDepartmentObject = require("./getDepartmentObject");

/**
 * Get event department from FFA dep code
 * @param {Object} event
 * @param {string} event.dep
 * @param {Object} [event.address]
 *
 * @returns {Object} departmentInfo
 * @returns {string} departmentInfo.countySlug
 * @returns {Object} departmentInfo.address
 *
 * */
module.exports = async function getEventDepartment(event) {
  let { dep, address = {} } = event;

  // Get department object
  const depCode = getFormattedDepartmentCode(dep);
  const department = getDepartmentObject(depCode);
  if (!department) {
    const message = "[La Foulée] ERROR: this event has an unknown department";
    console.error(message, JSON.stringify(event, null, 2));
    throw message;
  }

  // Get department details from La Foulée Places API
  const res = await getPlace(dep.slug);
  if (!res.data) {
    const message = `updateEventDepartment | Can't find slug in La Foulée Places API: ${dep.slug}`;
    console.error(message);
    // Throw message ?
    return null;
  }

  return {
    countySlug: res.data.slug,
    address: { ...address, county: res.data.name },
  };
};
