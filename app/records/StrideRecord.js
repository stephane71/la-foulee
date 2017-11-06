import { Record } from 'immutable';

class StrideRecord extends Record({

  id: null,

  title: null,

  keyword: null,

  date: null,

  dep: null,

  city: null,

  type: null,

  // Should be remove
  distances: [],

  activities: [],

  infos: null,

  inscription: null,

  organizer: {
    name: null,
    email: null,
    phone: null,
    website: null
  },

  lastUpdate: {
    date: null,
    user: null
  }

}) {}

export default StrideRecord;
