/*
 *
 * Search actions
 *
 */

import {
  UPDATE_SELECTORS,
} from './constants';

export function updateSelectors(selectors) {
  return {
    type: UPDATE_SELECTORS,
    selectors
  };
}
