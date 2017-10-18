/*
 *
 * Search reducer
 *
 */

import { fromJS, Map, List } from 'immutable'
import qs from 'query-string'

import makeRecordsList from 'utils/makeRecordsList'
import StrideRecord from 'records/StrideRecord'

import {
  UPDATE_SELECTORS,
  SET_NB_PAGES,
  SET_STRIDES
} from './constants';

const initialState = fromJS({
  selectors: Map(),
  strides: List(),
  nbStrides: 0,
  pages: 0
});

function getMergedStrideList (currentList, newList) {
  return currentList.concat(newList)
}

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTORS:
      return state.set('selectors', action.selectors)
    case SET_NB_PAGES:
      return state.set('pages', action.pages)
    case SET_STRIDES:
      let strides = List(action.strides.map(strideList => makeRecordsList(StrideRecord, strideList)))
      if (!action.refresh) {
        strides = getMergedStrideList(state.get('strides'), strides)
      }

      return state
        .set('strides', strides)
        .set('nbStrides', strides.reduce((n, nextList) => n += nextList.size, 0))
    default:
      return state;
  }
}

export default searchReducer;
