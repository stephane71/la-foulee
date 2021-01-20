const departments = require("../../commons/departments.json");

/**
 * Get department object from department code
 * @param {string} depCode
 *
 * @returns {Object} department
 *
 * */
module.exports = function getDepartmentObject(depCode) {
  const department = departments.find(({ code }) => code === depCode);
  if (!department) {
    return null;
  }

  // Overwrite department name
  if (department.code === "974") {
    // From "La Réunion" to "Reunion" to help google map
    department.name = "Reunion";
  }

  return department;
};
