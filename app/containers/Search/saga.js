import { takeLatest } from 'redux-saga/effects'

import { LOAD_STRIDES } from './constants'


function* loadStrides ({ selectors }) {
  console.log('Search:saga:loadStrides', selectors);
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDES, loadStrides)
}
