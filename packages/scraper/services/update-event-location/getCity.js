import apigClientFactory from "aws-api-gateway-client";

const api = apigClientFactory.default.newClient({
  invokeUrl: process.env.PLACES_API_URL,
  region: process.env.PLACES_API_REGION,
  //apiKey: process.env.PLACES_API_KEY,
});

/**
 * Get department object from department code
 * @param {string} slug
 * @param {string} countySlug
 *
 * @returns {Object} city
 *
 * */
function getCity(slug, countySlug) {
  return api.invokeApi(
    { slug, county: countySlug },
    "/{county}/{slug}",
    "GET",
    {}
  );
}

export default getCity;
