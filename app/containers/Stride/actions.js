/*
 *
 * Stride actions
 *
 */

import {
  LOAD_STRIDE,
  SET_STRIDE
} from './constants';

export function loadStride(api, id) {
  return {
    type: LOAD_STRIDE,
    api,
    id
  };
}

export function setStride(stride) {
  return {
    type: SET_STRIDE,
    stride
  };
}
