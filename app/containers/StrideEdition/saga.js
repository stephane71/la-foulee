import { takeLatest, call, put } from 'redux-saga/effects';

import { UPDATE_STRIDE } from 'containers/Search/constants'

import {
  PATCH_STRIDE,
  STRIDE_UPDATING_START,
  STRIDE_UPDATING_END
} from './constants'

function* patchStride ({ api, strideID, data }) {
  yield put({ type: STRIDE_UPDATING_START })

  try {
    yield call(api.strideStrideIDPatch, { strideID }, data)
  } catch (e) {
    console.log('Error on patchStride');
    console.log(e);
  }

  yield put({
    type: UPDATE_STRIDE,
    strideID,
    data
  })

  yield put({ type: STRIDE_UPDATING_END })
}

export default function* defaultSaga() {
  yield takeLatest(PATCH_STRIDE, patchStride)
}
