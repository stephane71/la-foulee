import { BillingMode, ProjectionType } from "@aws-cdk/aws-dynamodb";

export const TABLE_BASE = {
  TABLE_NAME: "RunningEventsTable",
  HASH_KEY: "keyword",
  RANGE_KEY: "date",
};

// KEYS
const KEYWORD = TABLE_BASE.HASH_KEY;
const DATE = TABLE_BASE.RANGE_KEY;

// WHAT
const TITLE = "title";
const DATE_END = "dateEnd";
const TYPE = "type";
const INFOS = "infos";
const ORGANIZER = "organizer";
const TAGS = "tags";
const STATUS = "status";
// WHERE
const GEOHASH = "geohash";
const PLACE = "place";
const COUNTY = "county";
// OTHER
const ACTIVITIES = "activities";
const WEBSITES = "websites";

// 2nd level attributes
// const ACTIVITY = {
//   TIME: "time",
//   DISTANCE: "distance",
//   TITLE: "title",
//   PRICE: "price",
//   INFOS: "infos",
// };

export const ATTRIBUTE = {
  KEYWORD,
  DATE,
  TITLE,
  DATE_END,
  TYPE,
  INFOS,
  ORGANIZER,
  TAGS,
  STATUS,
  GEOHASH,
  PLACE,
  COUNTY,
  ACTIVITIES,
  WEBSITES,
};

// 2 validation rules from DynamoDB
// - Some AttributeDefinitions are not used.
// - Member must satisfy enum value set: [B, N, S];
export const ATTRIBUTE_DEFINITION = {
  [ATTRIBUTE.KEYWORD]: {
    name: ATTRIBUTE.KEYWORD,
    type: "S",
  },
  [ATTRIBUTE.DATE]: {
    name: ATTRIBUTE.DATE,
    type: "N",
  },
  [ATTRIBUTE.TYPE]: {
    name: ATTRIBUTE.TYPE,
    type: "N",
  },
  [ATTRIBUTE.GEOHASH]: {
    name: ATTRIBUTE.GEOHASH,
    type: "S",
  },
  [ATTRIBUTE.PLACE]: {
    name: ATTRIBUTE.PLACE,
    type: "S",
  },
  [ATTRIBUTE.COUNTY]: {
    name: ATTRIBUTE.COUNTY,
    type: "S",
  },
  [ATTRIBUTE.TITLE]: {
    name: ATTRIBUTE.TITLE,
    type: "S",
  },
};

export const GSI_LIST = [
  {
    name: `${ATTRIBUTE.GEOHASH}-${ATTRIBUTE.DATE}-GSI`,
    hashKey: ATTRIBUTE.GEOHASH,
    rangeKey: ATTRIBUTE.DATE,
  },
  {
    name: `${ATTRIBUTE.PLACE}-${ATTRIBUTE.DATE}-GSI`,
    hashKey: ATTRIBUTE.PLACE,
    rangeKey: ATTRIBUTE.DATE,
  },
  {
    name: `${ATTRIBUTE.COUNTY}-${ATTRIBUTE.DATE}-GSI`,
    hashKey: ATTRIBUTE.COUNTY,
    rangeKey: ATTRIBUTE.DATE,
  },
  {
    name: `${ATTRIBUTE.TYPE}-${ATTRIBUTE.DATE}-GSI`,
    hashKey: ATTRIBUTE.TYPE,
    rangeKey: ATTRIBUTE.DATE,
  },
];

export const PROPERTIES = {
  TableName: TABLE_BASE.TABLE_NAME,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  AttributeDefinitions: Object.values(ATTRIBUTE_DEFINITION).map(
    ({ name, type }) => ({
      AttributeName: name,
      AttributeType: type,
    })
  ),
  KeySchema: [
    {
      AttributeName: ATTRIBUTE.KEYWORD,
      KeyType: "HASH",
    },
    {
      AttributeName: ATTRIBUTE.DATE,
      KeyType: "RANGE",
    },
  ],
  GlobalSecondaryIndexes: GSI_LIST.map(({ name, hashKey, rangeKey }) => ({
    IndexName: name,
    Projection: {
      ProjectionType: ProjectionType.ALL,
    },
    KeySchema: [
      {
        AttributeName: hashKey,
        KeyType: "HASH",
      },
      {
        AttributeName: rangeKey,
        KeyType: "RANGE",
      },
    ],
  })),
};
