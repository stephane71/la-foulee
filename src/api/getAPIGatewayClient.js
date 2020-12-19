import apigClientFactory from "aws-api-gateway-client";
import APIS from "./apis";

const API_BASE_URL = "https://api.la-foulee.com";
const API_REGION = "eu-west-2";

export default function getAPIGatewayClient(apiName, credentials) {
  const api = APIS.find(({ name }) => name === apiName);
  if (!api) {
    throw new Error(`The api: ${apiName} doesn't exist`);
  }

  // const { accessKeyId, secretAccessKey, sessionToken } = credentials;
  const { path } = api;

  return apigClientFactory.newClient({
    invokeUrl: `${API_BASE_URL}/${path}`,
    region: API_REGION,
    /*accessKey: accessKeyId,
    secretKey: secretAccessKey,
    sessionToken,*/
    apiKey: process.env.API_KEY
  });
}
