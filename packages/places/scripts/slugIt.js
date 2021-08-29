const slug = require("slug");

module.exports = function slugIt(string) {
  return slug(string, { lower: true });
};
