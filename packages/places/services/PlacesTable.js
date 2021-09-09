import { DynamoDB } from "@la-foulee/utils";
import { GSI, PLACE_TYPE } from "../table.definitinon";

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

  getDepartment(code) {
    return this.queryGSI(
      GSI.CodeTypeGSI,
      { hashKey: code, rangeKey: PLACE_TYPE.DEPARTMENT },
      "="
    );
  }
}

export default PlacesTable;
