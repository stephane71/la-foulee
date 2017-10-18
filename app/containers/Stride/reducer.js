/*
 *
 * Stride reducer
 *
 */

import { fromJS, Map } from 'immutable';
import StrideRecord from 'records/StrideRecord';

import {
  SET_STRIDE
} from './constants';

const initialState = fromJS({
  data: new StrideRecord()
});

function strideReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRIDE:
      return state.set('data', new StrideRecord(action.stride))
    default:
      return state;
  }
}

export default strideReducer;
