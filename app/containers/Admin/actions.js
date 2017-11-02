/*
 *
 * Admin actions
 *
 */

import {
  LOAD_STRIDES,
  SET_STRIDES
} from './constants';

export function loadStrides(api, selectors) {
  return {
    type: LOAD_STRIDES,
    api,
    selectors
  };
}
