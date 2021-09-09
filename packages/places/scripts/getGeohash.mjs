import {getGeohashFromLocation} from "@la-foulee/utils";

function getGeohash(coordinates) {
    if (!coordinates) {
        return undefined;
    }

    const [lat, lng] = coordinates;
    return getGeohashFromLocation({lat, lng}) || undefined;
}

export default getGeohash;
