import { takeLatest, put, call } from 'redux-saga/effects';

import { PATCH_STRIDE } from 'containers/Admin/constants'

import { LOAD_STRIDE } from './constants';
import { setStride } from './actions';

function* loadStride ({ api, data }) {
  const res = yield call(api.strideStrideIDGet, { strideID: data.id })
  yield put(setStride(res.data))
}

function* patchStride ({ api, strideID, data }) {
  try {
    yield call(api.strideStrideIDPatch, { strideID }, data)
  } catch (e) {
    console.log('Error on patchStride');
    console.log(e);
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDE, loadStride)
  yield takeLatest(PATCH_STRIDE, patchStride)
}
