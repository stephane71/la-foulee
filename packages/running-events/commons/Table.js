import { DynamoDB } from "@la-foulee/utils";

const HASH_KEY = process.env.TABLE_HASH_KEY;
const RANGE_KEY = process.env.TABLE_RANGE_KEY;

class Table extends DynamoDB {
  getRunningEvent({ keyword, date }) {
    return this.getItem({ [HASH_KEY]: keyword, [RANGE_KEY]: date });
  }

  putRunningEvent({ keyword, date }, runningEvent) {
    return this.putItem(
      { [HASH_KEY]: keyword, [RANGE_KEY]: date },
      runningEvent
    );
  }

  deleteRunningEvent({ keyword, date }) {
    return this.deleteItem({ [HASH_KEY]: keyword, [RANGE_KEY]: date });
  }
}

export default Table;
