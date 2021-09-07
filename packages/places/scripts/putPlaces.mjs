import { default as apigClientFactory } from "aws-api-gateway-client";
import { pause } from "@la-foulee/utils";

const API_ID = "nskcrq0b2m";
const API_REGION = "eu-west-3";
const apigClient = apigClientFactory.newClient({
  invokeUrl: `https://${API_ID}.execute-api.${API_REGION}.amazonaws.com/dev`,
});

const BREAK = 1000;
const BATCH = 10;

let batch = [];

function putPlaces(places) {
  return places.reduce(async (prev, place, i) => {
    if (!(i % BATCH)) {
      console.log("---- break ----");
      await Promise.all(batch);
      await pause(BREAK);

      batch = [];
    } else {
      batch.push(prev);
    }

    const { slug, county } = place;
    console.log("put place", place.slug, i);

    return apigClient
      .invokeApi({ county, slug }, "/{county}/{slug}", "PUT", {}, place)
      .catch(function (result) {
        console.error(result);
      });
  }, Promise.resolve());
}

export default putPlaces;
