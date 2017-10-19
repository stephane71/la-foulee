import { takeLatest, put } from 'redux-saga/effects';

import { FETCHING_START, FETCHING_END } from 'containers/App/constants';
import { LOAD_STRIDE } from './constants';
import { setStride } from './actions';

function* loadStride ({ api, id }) {
  // yield put({ type: FETCHING_START })
  // yield put({ type: FETCHING_END })
  console.log('Stride:saga:loadStride');
  yield put(setStride({ title: 'stride de test', date: 1508405826, type: 'route', dep: '71' }))
}


export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDE, loadStride)
}
