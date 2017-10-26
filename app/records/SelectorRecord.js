import { Record } from 'immutable';

class SelectorRecord extends Record({

  month: '',

  dep: '',

  isEmpty () {
    return !this.month
  },

  toJS () {
    return { dep: this.dep, month: this.month }
  }

}) {}

export default SelectorRecord;
