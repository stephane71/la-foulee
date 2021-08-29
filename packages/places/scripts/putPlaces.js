const pause = require("./pause");
const { default: apigClientFactory } = require("aws-api-gateway-client");

const apigClient = apigClientFactory.newClient({
  invokeUrl: "https://miifwj1qk7.execute-api.eu-west-3.amazonaws.com/dev",
});

module.exports = function putPlaces(places) {
  return places.reduce(async (prev, place) => {
    await prev;
    await pause(1000);

    console.log("put place", place.slug);
    return await apigClient
      .invokeApi({ slug: place.slug }, "/{slug}", "PUT", {}, place)
      .catch(function (result) {
        console.error(result);
      });
  }, Promise.resolve());
};
