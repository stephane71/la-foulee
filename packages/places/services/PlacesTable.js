import { DynamoDB } from "@la-foulee/utils";
import {
  GSI,
  PLACE_TYPE,
  ATTRIBUTES_DEFINITION,
  ATTRIBUTE,
} from "../table.definitinon";

const HASH_KEY = process.env.TABLE_HASH_KEY;
const RANGE_KEY = process.env.TABLE_RANGE_KEY;

class PlacesTable extends DynamoDB {
  getPlace({ slug, county }) {
    return this.getItem({ [HASH_KEY]: slug, [RANGE_KEY]: county });
  }

  putPlace({ slug, county }, place) {
    return this.putItem({ [HASH_KEY]: slug, [RANGE_KEY]: county }, place);
  }

  deletePlace({ slug, county }) {
    return this.deleteItem({ [HASH_KEY]: slug, [RANGE_KEY]: county });
  }

  getDepartmentFromCode(code) {
    return this.queryGSI(
      GSI.CodeTypeGSI,
      { hashKey: code, rangeKey: PLACE_TYPE.DEPARTMENT },
      "="
    );
  }

  getDepartmentList() {
    return this.queryGSI(GSI.TypePopulationGSI, {
      hashKey: PLACE_TYPE.DEPARTMENT,
    });
  }

  getRegionFromCode(code) {
    return this.queryGSI(
      GSI.CodeTypeGSI,
      { hashKey: code, rangeKey: PLACE_TYPE.REGION },
      "="
    );
  }

  getRegionList() {
    return this.queryGSI(GSI.TypePopulationGSI, {
      hashKey: PLACE_TYPE.REGION,
    });
  }

  getPlaces(slug, type) {
    const TYPE = ATTRIBUTES_DEFINITION[ATTRIBUTE.TYPE];

    return this.query(
      { name: HASH_KEY, value: slug },
      type ? { name: TYPE.name, value: type } : null
    );
  }
}

export default PlacesTable;
