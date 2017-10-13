import { takeLatest, put } from 'redux-saga/effects';

import {
  INIT_CREDENTIALS,
  SET_CREDENTIALS,
  REQUEST_API
} from './constants'

import asyncGetCredentials from 'utils/asyncGetCredentials';

function* fetchCredentials(session) {
  try {
    let credentials = yield asyncGetCredentials(session)
    yield put({ type: SET_CREDENTIALS, credentials })
  } catch (err) {
    // yield put(actionError??(err));
    console.log(err)
  }
}

function* initCredentials () {
  yield fetchCredentials()
}

function* requestAPI ({ action, credentials, data }) {
  yield put(action(credentials, data))
}

export default function* defaultSaga() {
  yield [
    takeLatest(INIT_CREDENTIALS, initCredentials),
    takeLatest(REQUEST_API, requestAPI),
  ]
}
