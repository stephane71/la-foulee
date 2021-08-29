const pause = require("./pause");
const { default: apigClientFactory } = require("aws-api-gateway-client");

const apigClient = apigClientFactory.newClient({
  invokeUrl: "https://miifwj1qk7.execute-api.eu-west-3.amazonaws.com/dev",
});

const BREAK = 1000;
const BATCH = 5;

module.exports = function putPlaces(places) {
  return places.reduce(async (prev, place, i) => {
    await prev;
    if (!(i % BATCH)) {
      console.log("---- break ----");
      await pause(BREAK);
    }

    console.log("put place", place.slug, i);
    return apigClient
      .invokeApi({ slug: place.slug }, "/{slug}", "PUT", {}, place)
      .catch(function (result) {
        console.error(result);
      });
  }, Promise.resolve());
};
