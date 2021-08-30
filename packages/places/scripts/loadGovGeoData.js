const yargs = require("yargs");
const fetch = require("node-fetch");
const slugIt = require("./slugIt");
const putPlaces = require("./putPlaces");
const types = require("./placesTypes.json");

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .command("type", "Type of the geo api data")
  .alias("t", "type")
  .nargs("t", 1)
  .choices("t", Object.values(types))
  .describe("t", "Geo data type")
  .demandOption(["t"]).argv;

const BASE_URL = "https://geo.api.gouv.fr";

const geoApi = {
  [types.REGION]: {
    type: types.REGION,
    path: "regions",
    format: ({ nom, code }) => ({
      slug: slugIt(nom),
      name: nom,
      code,
      type: types.REGION,
    }),
  },
  [types.DEPARTMENT]: {
    type: types.DEPARTMENT,
    path: "departements",
    fields: "region",
    format: ({ nom, code, codeRegion, region }) => ({
      slug: slugIt(nom),
      name: nom,
      code,
      codeRegion,
      type: types.DEPARTMENT,
    }),
  },
  [types.CITY]: {
    type: types.CITY,
    path: "communes",
    fields:
      "code,nom,codeDepartement,codeRegion,centre,population,codesPostaux,departement",
    format: ({
      nom,
      code,
      codeDepartement,
      codeRegion,
      centre,
      population,
      codesPostaux,
    }) => ({
      slug: slugIt(nom),
      name: nom,
      code,
      codeRegion,
      codeDepartment: codeDepartement,
      type: types.CITY,
      postalCodes: codesPostaux,
      location: centre?.coordinates,
      population,
    }),
  },
};

async function getGeoItems(type) {
  const geoDataItem = geoApi[type];
  const fields = geoDataItem.fields ? `?fields=${geoDataItem.fields}` : "";
  const url = `${BASE_URL}/${geoDataItem.path}${fields}`;

  console.log("Fetch data on Geo API");
  console.log(url);

  const res = await fetch(url);
  const items = await res.json();

  return items.map(geoDataItem.format);
}

async function run() {
  const items = await getGeoItems(argv.type);
  console.log(items[0]);

  await putPlaces(items);
}

run().then(() => console.log("end"));
