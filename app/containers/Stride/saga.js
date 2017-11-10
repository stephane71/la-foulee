import { takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_STRIDE } from './constants';
import { setStride } from './actions';

function* loadStride ({ api, data }) {
  const res = yield call(api.strideStrideIDGet, { strideID: data.id })
  yield put(setStride(res.data))
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDE, loadStride)
}
