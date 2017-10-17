import { Record } from 'immutable';

class StrideRecord extends Record({

  id: null,

  title: null,

  date: null,

  dep: null,

  type: null,

  distances: []

}) {}

export default StrideRecord;
