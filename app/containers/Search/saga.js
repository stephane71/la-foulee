import { takeLatest } from 'redux-saga/effects'

import { LOAD_STRIDES } from './constants'


function* loadStrides ({ api, selectors }) {
  console.log('Search:saga:loadStrides', api, selectors);
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDES, loadStrides)
}
