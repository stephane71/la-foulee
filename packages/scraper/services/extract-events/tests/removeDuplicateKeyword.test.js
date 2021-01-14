const removeDuplicateKeyword = require("../removeDuplicateKeyword");

describe("scraper:extract-events:removeDuplicateKeyword", () => {
  test("Should remove 0 events", () => {
    const events = [{ keyword: "test1" }, { keyword: "test2" }];
    const filteredEvents = removeDuplicateKeyword(events);

    expect(filteredEvents.length).toEqual(events.length);
  });

  test("Should remove 2 events", () => {
    const events = [
      { keyword: "test1" },
      { keyword: "test2" },
      { keyword: "test1" },
      { keyword: "test1" },
    ];
    const filteredEvents = removeDuplicateKeyword(events);

    expect(filteredEvents.length).toEqual(events.length - 2);
  });
});
