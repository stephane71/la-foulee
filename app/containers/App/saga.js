import { takeLatest, put } from 'redux-saga/effects'

import {
  INIT_CREDENTIALS,
  UPDATE_CREDENTIALS,
  SET_CREDENTIALS,
  REQUEST_API
} from './constants'

import asyncGetCredentials from 'utils/asyncGetCredentials';

function* fetchCredentials(currentCredentials, session) {
  try {
    let credentials = yield asyncGetCredentials(session, currentCredentials)
    yield put({ type: SET_CREDENTIALS, credentials })
  } catch (err) {
    // yield put(actionError??(err));
    console.log(err)
  }
}

function* initCredentials () {
  yield fetchCredentials()
}

function* updateCredentials ({ credentials }) {
  yield fetchCredentials(credentials)
}

function* requestAPI ({ api, action, data }) {
  yield put(action(api, data))
}

export default function* defaultSaga() {
  yield [
    takeLatest(INIT_CREDENTIALS, initCredentials),
    takeLatest(UPDATE_CREDENTIALS, updateCredentials),
    takeLatest(REQUEST_API, requestAPI),
  ]
}
