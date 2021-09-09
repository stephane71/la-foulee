// KEYS
const SLUG = "slug";
const COUNTY = "county";
//
const TYPE = "type";
const GEOHASH = "geohash";
const CODE = "code";
const POPULATION = "population";

export const ATTRIBUTES_DEFINITION = {
  [SLUG]: {
    name: SLUG,
    type: "S",
  },
  [COUNTY]: {
    name: COUNTY,
    type: "S",
  },
  [TYPE]: {
    name: TYPE,
    type: "S",
  },
  [GEOHASH]: {
    name: GEOHASH,
    type: "S",
  },
  [CODE]: {
    name: CODE,
    type: "S",
  },
  [POPULATION]: {
    name: POPULATION,
    type: "N",
  },
};

const CountyTypeGSI = "CountyTypeGSI";
const GeohashTypeGSI = "GeohashTypeGSI";
const CodeTypeGSI = "CodeTypeGSI";
const TypePopulationGSI = "TypePopulationGSI";

export const GSI = {
  [CountyTypeGSI]: {
    name: CountyTypeGSI,
    hashKey: COUNTY,
    rangeKey: TYPE,
  },
  [GeohashTypeGSI]: {
    name: GeohashTypeGSI,
    hashKey: GEOHASH,
    rangeKey: TYPE,
  },
  [CodeTypeGSI]: {
    name: CodeTypeGSI,
    hashKey: CODE,
    rangeKey: TYPE,
  },
  [TypePopulationGSI]: {
    name: TypePopulationGSI,
    hashKey: TYPE,
    rangeKey: POPULATION,
  },
};

// EXTRA DATA ABOUT THIS TABLE
export const PLACE_TYPE = {
  REGION: "REGION",
  DEPARTMENT: "DEPARTMENT",
  CITY: "CITY",
};
