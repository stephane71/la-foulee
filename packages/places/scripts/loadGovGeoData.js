const yargs = require("yargs");

const apigClientFactory = require("aws-api-gateway-client").default;
const fetch = require("node-fetch");
const slug = require("slug");
const types = require("./placesTypes.json");

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .command("type", "Type of the geo api data")
  .alias("t", "type")
  .nargs("t", 1)
  .choices("t", Object.values(types))
  .describe("t", "Geo data type")
  .demandOption(["t"]).argv;

const pause = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration)
  );

const slugIt = (string) => slug(string, { lower: true });

const apigClient = apigClientFactory.newClient({
  invokeUrl: "https://miifwj1qk7.execute-api.eu-west-3.amazonaws.com/dev",
});

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
    format: ({ nom, code, codeRegion }) => ({
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
      "code,nom,codeDepartement,codeRegion,centre,population,codesPostaux",
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
      location: centre.coordinates,
      population,
    }),
  },
};

async function getGeoItems(type) {
  const geoDataItem = geoApi[type];
  const fields = geoDataItem.fields ? `?fields=${geoDataItem.fields}` : "";
  const res = await fetch(`${BASE_URL}/${geoDataItem.path}${fields}`);
  const regions = await res.json();

  return regions.map(geoDataItem.format);
}

function putPlaces(places) {
  return places.reduce(async (prev, place) => {
    await prev;
    await pause(1000);

    console.log("put place", place.slug);
    return await apigClient
      .invokeApi({ slug: place.slug }, "/{slug}", "PUT", {}, place)
      .catch(function (result) {
        console.error(result);
      });
  }, Promise.resolve());
}

async function run() {
  const items = await getGeoItems(argv.type);
  console.log(items[0]);

  await putPlaces(items);
}

run().then(() => console.log("end"));
