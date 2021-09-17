import cheerio from "cheerio";
import EventListExtractor from "./EventListExtractor";
import removeDuplicateKeyword from "./removeDuplicateKeyword.js";

async function extractEvents(data) {
  const eventExtractor = new EventListExtractor(cheerio.load(data));
  const events = eventExtractor.extract();

  const eventsInList = eventExtractor.$(".barCount").eq(0).text();
  console.log(
    `[La Foulée] extractEventList: Extract ${events.length} / ${parseInt(
      eventsInList
    )} events`
  );

  return removeDuplicateKeyword(events);
}

export default extractEvents;
