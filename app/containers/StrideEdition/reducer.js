/*
 *
 * StrideEdition reducer
 *
 */

import { fromJS } from 'immutable';
import {
  STRIDE_UPDATING_START,
  STRIDE_UPDATING_END
} from './constants';

const initialState = fromJS({
  strideUpdating: false
});

function strideEditionReducer(state = initialState, action) {
  switch (action.type) {
    case STRIDE_UPDATING_START:
      return state.set('strideUpdating', true)
    case STRIDE_UPDATING_END:
      return state.set('strideUpdating', false)
    default:
      return state;
  }
}

export default strideEditionReducer;
