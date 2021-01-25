const apigClientFactory = require("aws-api-gateway-client").default;

const api = apigClientFactory.newClient({
  invokeUrl: process.env.PLACE_PROXY_API_URL,
  region: process.env.PLACE_PROXY_API_REGION,
  accessKey: process.env.ACCESS_KEY_ID,
  secretKey: process.env.SECRET_ACCESS_KEY,
});

console.log(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY);

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
