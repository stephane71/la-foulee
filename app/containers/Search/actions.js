/*
 *
 * Search actions
 *
 */

import {
  UPDATE_SELECTORS,
  LOAD_STRIDES,
  STRIDES_LOADED
} from './constants';

export function updateSelectors(selectors) {
  return {
    type: UPDATE_SELECTORS,
    selectors
  };
}

export function loadStrides(api, selectors) {
  return {
    type: LOAD_STRIDES,
    api,
    selectors
  };
}

export function stridesLoaded(strides) {
  return {
    type: STRIDES_LOADED,
    strides
  };
}
