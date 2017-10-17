/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';

import {
  FETCHING_START,
  FETCHING_END,
  MIN_LOADING_TIME
} from './constants';

const initialState = fromJS({
  fetching: true,
  minLoadingTime: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_START:
      return state.set('fetching', true)
    case FETCHING_END:
      return state.set('fetching', false)
    case MIN_LOADING_TIME:
      return state.set('minLoadingTime', !state.get('minLoadingTime'))
    default:
      return state
  }
}

export default appReducer;
