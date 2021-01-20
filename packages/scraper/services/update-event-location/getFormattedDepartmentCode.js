/**
 * Format FFA department extract from website
 * @param {string} dep
 *
 * @returns {string} formattedDep
 *
 * */
module.exports = function getFormattedDepartmentCode(dep) {
  if (typeof dep !== "string") {
    throw "Argument 'dep' should be a string";
  }

  switch (dep) {
    case "201":
      return "2A";
    case "202":
      return "2B";
    case "981":
      return "988";
    default: {
      const parsedDep = parseInt(dep);
      if (isNaN(parsedDep) || parsedDep > 989) {
        throw "Invalid department value";
      }
      if (parsedDep < 10) {
        return `0${parsedDep}`;
      } else {
        return `${parsedDep}`;
      }
    }
  }
};
