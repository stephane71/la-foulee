import apigClientFactory from "aws-api-gateway-client";

const api = apigClientFactory.newClient({
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
async function getCity(slug, countySlug) {
  const res = await api.invokeApi(
    { slug, county: countySlug },
    "/{county}/{slug}",
    "GET",
    {}
  );

  return res.data;
}

export default getCity;
