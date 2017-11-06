/*
 *
 * Admin actions
 *
 */

import {
  LOAD_STRIDES,
  PATCH_STRIDE
} from './constants';

export function loadStrides(api, selectors) {
  return {
    type: LOAD_STRIDES,
    api,
    selectors
  };
}

export function patchStride (api, { strideID, data }) {
  return {
    type: PATCH_STRIDE,
    api,
    strideID,
    data
  }
}
