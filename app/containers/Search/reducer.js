/*
 *
 * Search reducer
 *
 */

import { fromJS, Map } from 'immutable';
import qs from 'query-string';
import {
  UPDATE_SELECTORS,
  STRIDES_LOADED
} from './constants';

const initialState = fromJS({
  selectors: Map(qs.parse(window.location.search)),
  strides: []
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTORS:
      return state.set('selectors', action.selectors);
    case STRIDES_LOADED:
      return state.set('strides', action.strides)
    default:
      return state;
  }
}

export default searchReducer;
