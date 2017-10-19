/*
 *
 * Stride actions
 *
 */

import {
  LOAD_STRIDE,
  SET_STRIDE
} from './constants';

export function loadStride(api, data) {
  return {
    type: LOAD_STRIDE,
    api,
    data
  };
}

export function setStride(stride) {
  return {
    type: SET_STRIDE,
    stride
  };
}
