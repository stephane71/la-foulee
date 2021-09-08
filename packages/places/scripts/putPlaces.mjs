import apigClientFactory from "aws-api-gateway-client";
import { pause } from "@la-foulee/utils";

const API_ID = "nskcrq0b2m";
const API_REGION = "eu-west-3";

const apigClient = apigClientFactory.default.newClient({
  invokeUrl: `https://${API_ID}.execute-api.${API_REGION}.amazonaws.com/dev`,
});

const BREAK = 5000;
const BATCH = 15;

function batchReq(placesSlice) {
  console.log(placesSlice);

  return placesSlice.map((place) => {
    const { slug, county } = place;
    console.log("put place", county, slug);

    return apigClient.invokeApi(
      { county, slug },
      "/{county}/{slug}",
      "PUT",
      {},
      place
    );
  });
}

async function putPlaces(places) {
  for (let i = 0; i < places.length; i++) {
    const start = i * BATCH;
    const end = (i + 1) * BATCH;

    if (start > places.length) {
      return Promise.resolve();
    }

    console.log("batch from ", start, "to", end);

    const batch = batchReq(places.slice(start, end));
    await Promise.all(batch);

    console.log("-- break");
    await pause(BREAK);
  }
}

export default putPlaces;
