import getEventDetailsHTMLPage from "./getEventDetailsHTMLPage";
import extractEventDetails from "./extractEventDetails";
import getEventDetailsFormatted from "./getEventDetailsFormatted";

async function getEventDetails(event) {
  const htmlPage = await getEventDetailsHTMLPage(event.idFFA);
  const eventDetailsExtracted = await extractEventDetails(htmlPage);
  const formattedEvent = await getEventDetailsFormatted(eventDetailsExtracted);

  return { ...event, ...formattedEvent };
}

export default getEventDetails;
