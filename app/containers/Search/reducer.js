/*
 *
 * Search reducer
 *
 */

import { fromJS, Map } from 'immutable';
import qs from 'query-string';
import {
  UPDATE_SELECTORS,
} from './constants';

const initialState = fromJS({
  selectors: Map(qs.parse(window.location.search))
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTORS:
      return state.set('selectors', action.selectors);
    default:
      return state;
  }
}

export default searchReducer;
