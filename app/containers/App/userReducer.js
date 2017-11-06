/*
 *
 * User reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SET_CREDENTIALS,
  SET_USER_ADMIN
} from './constants';

const initialState = fromJS({
  credentials: null,
  admin: false
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ADMIN:
      return state.set('admin', true)
    case SET_CREDENTIALS:
      return state.set('credentials', action.credentials)
    default:
      return state
  }
}

export default userReducer;
