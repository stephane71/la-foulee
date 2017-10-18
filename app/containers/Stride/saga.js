import { takeLatest } from 'redux-saga/effects';

import { FETCHING_START, FETCHING_END } from 'containers/App/constants';
import { LOAD_STRIDE } from './constants';

function* loadStride ({ api, id }) {
  yield put({ type: FETCHING_START })

  

  yield put({ type: FETCHING_END })
}


export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDE, loadStride)
}
