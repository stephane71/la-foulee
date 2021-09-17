import getFormattedDepartmentCode from "./getFormattedDepartmentCode";
import getDepartment from "./getDepartment";

/**
 * Get event department from FFA dep code
 * @param {Object} event
 * @param {string} event.dep
 *
 * @returns {Object} department
 *
 * */
async function getEventDepartment(event) {
  const { dep } = event;

  const code = getFormattedDepartmentCode(dep);
  return await getDepartment(code);
}

export default getEventDepartment;
