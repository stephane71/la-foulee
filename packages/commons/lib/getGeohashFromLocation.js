import latlonGeohash from "latlon-geohash";

const GEOHASH_PRECISION = 4;

/**
 * Geohash calculation
 * @param {Object} location
 * @param {number} location.lat
 * @param {number} location.lng
 *
 * */
function getGeohashFromLocation(location) {
  return location
    ? latlonGeohash.encode(location.lat, location.lng, GEOHASH_PRECISION)
    : null;
}

export default getGeohashFromLocation;
