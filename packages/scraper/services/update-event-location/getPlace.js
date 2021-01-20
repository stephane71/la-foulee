const apigClientFactory = require("aws-api-gateway-client").default;

const api = apigClientFactory.newClient({
  invokeUrl: `${process.env.PLACE_PROXY_API_URL}`,
});

module.exports = function getPlace(input) {
  console.log(
    "[La Foulée] getPlace: Looked for",
    input,
    "in La Foulée Places API"
  );

  const [department, city] = input.split("_");
  const path = city ? `/{department}/{city}` : `/{department}`;
  const params = city ? { department, city } : { department };
  const args = [params, path, "GET", {}, {}];

  return api.invokeApi(...args);
};
