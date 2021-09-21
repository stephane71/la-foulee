import cheerio from "cheerio";

// Titles for the 2nd table with activities details
const ACTIVITIES_TITLE = ["LISTE DES ÉPREUVES", "ÉPREUVES / CONDITIONS"];
const getCellText = ($cell) => $cell.text().trim();

function extractTableData($, $table) {
  let $rows = $table
    .find("tr")
    .filter((i, tr) => $(tr).find("div").attr("class") !== "lineRed")
    .filter((i, tr) => $(tr).find("> td").length > 1); // table nested in table

  return $rows
    .map((i, row) => {
      let $cells = $(row).find("td");
      if ($cells.length === 7)
        return {
          name: "activity",
          time: getCellText($cells.eq(1)),
          title: getCellText($cells.eq(2)),
          distance: getCellText($cells.eq(4)),
        };

      return {
        name: getCellText($cells.eq(0)),
        value: getCellText($cells.eq(2)),
      };
    })
    .toArray();
}

function extractFFACode($, $table) {
  let ffaCode = null;
  $table.find("td").each((i, td) => {
    let type = $(td).text().trim().split(":");
    if (type[0] && type[0].trim() === "Code") ffaCode = type[1].trim();
  });

  return parseInt(ffaCode);
}

async function extractEventDetails(eventHTMLPage) {
  if (!eventHTMLPage) {
    console.log(
      "[La Foulee] | getEventDetailsExtracted: event details page is empty"
    );
    return null;
  }

  const $ = cheerio.load(eventHTMLPage);

  let ctnDetails = $("#ctnContentDetails");
  if (ctnDetails.find("> div.errors").length) return null;

  let $tables = $("#bddDetails table");
  $tables = $tables.filter(
    (i, table) =>
      $(table).attr("id") !== "ctnDetailsTabs" &&
      $(table).attr("class") !== "linedRed"
  );

  const ffaCode = extractFFACode($, $tables.eq(0));

  let event = extractTableData($, $tables.eq(1));
  let activities = [];
  let conditions = [];

  const tableTitles = ctnDetails.find("div.coloredRed");

  if (ACTIVITIES_TITLE.includes(tableTitles.eq(0).text())) {
    activities = extractTableData($, $tables.eq(2));
  }

  if (ACTIVITIES_TITLE.includes(tableTitles.eq(1).text())) {
    let nbExtractedTables =
      2 + activities.filter(({ name }) => name === "activity").length;
    conditions = extractTableData($, $tables.eq(nbExtractedTables));
  }

  return event
    .concat(conditions)
    .concat([{ name: "ffaCode", value: ffaCode }])
    .concat([{ name: "activities", value: activities }]);
}

export default extractEventDetails;
