import fs from "fs";
import { URL } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fetch from "node-fetch";
import { slugIt } from "@la-foulee/utils";
import putPlaces from "./putPlaces.mjs";
import getGeohash from "./getGeohash.mjs";

function getTypes() {
  const placesTypesFileURL = new URL("./placesTypes.json", import.meta.url);
  try {
    const types = fs.readFileSync(placesTypesFileURL.pathname, "utf8");
    return JSON.parse(types);
  } catch (err) {
    console.error(err);
  }
}

const types = getTypes();

const argv = yargs(hideBin(process.argv))
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
    format: async ({ nom, code }) => ({
      slug: slugIt(nom),
      county: "france",
      name: nom,
      code,
      type: types.REGION,
    }),
  },
  [types.DEPARTMENT]: {
    type: types.DEPARTMENT,
    path: "departements",
    fields: "region,codeRegion",
    format: async ({ nom, code, codeRegion, region }) => ({
      slug: slugIt(nom),
      county: slugIt(region.nom),
      name: nom,
      code,
      type: types.DEPARTMENT,
      codeRegion,
    }),
  },
  [types.CITY]: {
    type: types.CITY,
    path: "communes",
    fields:
      "code,nom,codeDepartement,codeRegion,centre,population,codesPostaux,departement",
    format: async ({
      nom,
      code,
      codeDepartement,
      codeRegion,
      centre,
      population,
      codesPostaux,
      departement,
    }) => ({
      slug: slugIt(nom),
      county: slugIt(departement.nom),
      name: nom,
      code,
      type: types.CITY,
      codeRegion,
      codeDepartment: codeDepartement,
      postalCodes: codesPostaux,
      location: centre?.coordinates,
      geohash: await getGeohash(centre?.coordinates),
      population,
    }),
  },
};

async function getGeoItems({ fields, path }) {
  const urlFields = fields ? `?fields=${fields}` : "";
  const url = `${BASE_URL}/${path}${urlFields}`;

  console.log("Fetch data on Geo API");
  console.log(url);

  const res = await fetch(url);
  return res.json();
}

async function getFormattedItems(items, formatFct) {
  return await items.reduce(async (prev, item) => {
    const current = await prev;
    const formattedItem = await formatFct(item);

    return Promise.resolve([...current, formattedItem]);
  }, Promise.resolve([]));
}

async function run() {
  const { type } = argv;
  const { fields, path, format } = geoApi[type];

  const items = await getGeoItems({ fields, path });
  console.log("Fetched items");
  console.log(items[0]);

  console.log("formatting items");
  const formattedItems = await getFormattedItems(items, format);

  console.log("formatted items :", formattedItems.length, 'places');
  await putPlaces(formattedItems);
}

run().then(() => console.log("end"));
