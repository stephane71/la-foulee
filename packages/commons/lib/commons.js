"use strict";

const getGeohashFromLocation = require("./getGeohashFromLocation");
const DynamoDB = require("./DynamoDB");

module.exports = {
  getGeohashFromLocation,
  DynamoDB,
};
