const DynamoDB = require("./DynamoDB");

const HASH_KEY = process.env.TABLE_HASH_KEY;

class PlacesTable extends DynamoDB {
  getPlace(slug) {
    return this.getItem({ [HASH_KEY]: slug });
  }

  putPlace(slug, place) {
    return this.putItem({ [HASH_KEY]: slug }, place);
  }
}

module.exports = PlacesTable;
