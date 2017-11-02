/*
 *
 * Admin reducer
 *
 */

import { fromJS, List } from 'immutable'

import makeRecordsList from 'utils/makeRecordsList'
import StrideRecord from 'records/StrideRecord'

import {
  SET_STRIDES,
} from './constants';

const initialState = fromJS({
  strides: List()
});

function getMergedStrideList (currentList, newList) {
  let lastDayCurrentList = currentList.last()
  let firstDayNewList = newList.first()
  if (lastDayCurrentList.get(0).get('date') === firstDayNewList.get(0).get('date')) {
    let mergeDayList = lastDayCurrentList.concat(firstDayNewList)
    currentList = currentList.set(-1, mergeDayList)
    newList = newList.shift()
  }
  return currentList.concat(newList)
}

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRIDES:
      let strides = List(action.strides.map(strideList => makeRecordsList(StrideRecord, strideList)))
      if (!action.refresh)
        strides = getMergedStrideList(state.get('strides'), strides)
      return state
        .set('strides', strides)
    default:
      return state;
  }
}

export default adminReducer;
