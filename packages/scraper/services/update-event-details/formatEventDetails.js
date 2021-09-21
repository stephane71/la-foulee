import formatEventDetails from "./format/formatEventDetails";
import formatEventDetailsActivities from "./format/formatEventDetailsActivities";
import formatEventDetailsActivitiesDistances from "./format/formatEventDetailsActivitiesDistances";
import formatEventDetailsActivitiesPrices from "./format/formatEventDetailsActivitiesPrices";

async function formatEventDetails(eventExtracted) {
  if (!eventExtracted) {
    return {};
  }

  let event = formatEventDetails(eventExtracted);
  event = formatEventDetailsActivities(event);
  event = formatEventDetailsActivitiesDistances(event);
  event = formatEventDetailsActivitiesPrices(event);
  // event = await checkEventOrgaWebsite(event);

  return event;
}

export default formatEventDetails;
