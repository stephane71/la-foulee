/*
 *
 * Search reducer
 *
 */

import { fromJS, Map } from 'immutable';
import qs from 'query-string';
import {
  UPDATE_SELECTORS,
  SET_NB_PAGES,
  SET_STRIDES
} from './constants';

const initialState = fromJS({
  selectors: Map(qs.parse(window.location.search)),
  strides: [],
  pages: null
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTORS:
      return state.set('selectors', action.selectors)
    case SET_NB_PAGES:
      return state.set('pages', action.pages)
    case SET_STRIDES:
      return state.set('strides', action.strides)
    default:
      return state;
  }
}

export default searchReducer;
