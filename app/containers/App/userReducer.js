/*
 *
 * User reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SET_CREDENTIALS
} from './constants';

const initialState = fromJS({
  credentials: null
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CREDENTIALS:
      return state.set('credentials', action.credentials)
    default:
      return state
  }
}

export default userReducer;
