import { List } from 'immutable';

export default (Record, data) =>
  List(data.map(item => new Record(item)))
