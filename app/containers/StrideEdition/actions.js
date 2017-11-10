/*
 *
 * StrideEdition actions
 *
 */

 import {
   PATCH_STRIDE
 } from './constants';

 export function patchStride (api, { strideID, data }) {
   return {
     type: PATCH_STRIDE,
     api,
     strideID,
     data
   }
 }
