/*
 *
 * Search actions
 *
 */

import {
  UPDATE_SELECTORS,
  LOAD_STRIDES,
  SET_CURRENT_PAGE
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

export function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
}
