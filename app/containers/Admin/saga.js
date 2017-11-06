import { takeLatest, call, put } from 'redux-saga/effects'
import { PATCH_STRIDE } from './constants'

function* patchStride ({ api, strideID, data }) {
  let res = yield call(api.strideStrideIDPatch, { strideID }, data)
}

export default function* defaultSaga() {
  yield takeLatest(PATCH_STRIDE, patchStride)
}
