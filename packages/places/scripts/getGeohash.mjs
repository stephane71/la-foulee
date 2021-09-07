import { getGeohashFromLocation } from "@la-foulee/utils";

function getGeohash(coordinates) {
  if (!coordinates) {
    return null;
  }

  const [lat, lng] = coordinates;
  return getGeohashFromLocation({ lat, lng });
}

export default getGeohash;
