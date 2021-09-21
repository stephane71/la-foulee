import apigClientFactory from "aws-api-gateway-client";

const invokeUrl = `https://${process.env.RUNNING_EVENTS_API_ID}.execute-api.${process.env.RUNNING_EVENTS_API_REGION}.amazonaws.com/dev`;

const api = apigClientFactory.newClient({
  invokeUrl,
  region: process.env.RUNNING_EVENTS_API_URL,
  //apiKey: process.env.RUNNING_EVENTS_API_KEY,
});

/*
 * TODO Handle merge with existing event
 *  Use case : An event has been modified by an organizer
 * */
async function putEvent(event) {
  return api.invokeApi(
    { keyword: event.keyword, date: event.date },
    "/{date}/{keyword}",
    "PUT",
    {},
    JSON.stringify(event)
  );
}

export default putEvent;
