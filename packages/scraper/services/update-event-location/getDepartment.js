import apigClientFactory from "aws-api-gateway-client";

const api = apigClientFactory.newClient({
  invokeUrl: process.env.PLACES_API_URL,
  region: process.env.PLACES_API_REGION,
  //apiKey: process.env.PLACES_API_KEY,
});

/**
 * Get department object from department code
 * @param {string} code
 *
 * @returns {Object} department
 *
 * */
async function getDepartment(code) {
  const res = await api.invokeApi(
    { type: "DEPARTMENT", code },
    "/departments/{code}",
    "GET",
    {}
  );

  return res.data;
}

export default getDepartment;
