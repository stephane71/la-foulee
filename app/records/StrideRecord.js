import { Record } from 'immutable';

class StrideRecord extends Record({

  id: null,

  title: null,

  date: null,

  dateEnd: null,

  dep: null,

  type: null,

  city: null,

  activities: [],

  distances: [],

  organizer: {},

  keyword: null,

  inscriptions: null

}) {}

export default StrideRecord;
