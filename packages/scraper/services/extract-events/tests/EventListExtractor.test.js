const cheerio = require("cheerio");
const EventListExtractor = require("../EventListExtractor");
const downloadDepartmentPage = require("../../download-sources/downloadFFADepartmentPage");

describe("EventListExtractor", () => {
  it("Should extract the same number of event as specify in document", async () => {
    const data = await downloadDepartmentPage(2018, "021");
    const eventExtractor = new EventListExtractor(cheerio.load(data));
    const events = eventExtractor.extract();
    const eventsNumberInDocument = parseInt(
      eventExtractor.$(".barCount").eq(0).text()
    );

    expect(events.length).toEqual(eventsNumberInDocument);
  });

  // TODO Test the event structure using JSON schema & AJV
  /*it("Should extract a valide event", () => {
      expect(events.length).toEqual(eventsNumberInDocument);
    });*/
});
