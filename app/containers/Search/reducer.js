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
  SET_STRIDES,
  SET_CURRENT_PAGE
} from './constants';

const initialState = fromJS({
  selectors: Map(),
  strides: List(),
  nbStrides: 0,
  pages: 0,
  currentPage: 0
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

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTORS:
      return state
        .set('selectors', action.selectors)
        .set('currentPage', 0)
    case SET_NB_PAGES:
      return state.set('pages', action.pages)
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.currentPage)
    case SET_STRIDES:
      let strides = List(action.strides.map(strideList => makeRecordsList(StrideRecord, strideList)))
      if (!action.refresh)
        strides = getMergedStrideList(state.get('strides'), strides)
      return state
        .set('strides', strides)
        .set('nbStrides', strides.reduce((n, nextList) => n += nextList.size, 0))
    default:
      return state;
  }
}

export default searchReducer;
