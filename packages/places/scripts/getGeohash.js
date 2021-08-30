const { getGeohashFromLocation } = require("commons");

function getGeohash(coordinates) {
  if (!coordinates) {
    return null;
  }
  const [lat, lng] = coordinates;
  return getGeohashFromLocation({ lat, lng });
}

module.exports = getGeohash;
