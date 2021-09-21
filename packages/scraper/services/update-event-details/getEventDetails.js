import getEventDetailsHTMLPage from "./getEventDetailsHTMLPage";
import extractEventDetails from "./extractEventDetails";
import formatEventDetails from "./formatEventDetails";

async function getEventDetails(event) {
  // GET - EXTRACT - FORMAT
  const htmlPage = await getEventDetailsHTMLPage(event.idFFA);
  const extractedEventDetails = await extractEventDetails(htmlPage);
  const formattedEvent = await formatEventDetails(extractedEventDetails);

  return { ...event, ...formattedEvent };
}

export default getEventDetails;
