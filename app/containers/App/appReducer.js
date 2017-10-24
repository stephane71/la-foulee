/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  FETCHING_START,
  FETCHING_END,
  MIN_LOADING_TIME
} from './constants';

const initialState = fromJS({
  fetching: true,
  minLoadingTime: false,
  cptLocation: 0
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.set('cptLocation', state.get('cptLocation') + 1)
    case FETCHING_START:
      return state.set('fetching', true)
    case FETCHING_END:
      return state.set('fetching', false)
    default:
      return state
  }
}

export default appReducer;
