import { takeLatest, call, put } from 'redux-saga/effects'

import { LOAD_STRIDES, SET_NB_PAGES, SET_STRIDES } from './constants'
import { FETCHING_START, FETCHING_END } from 'containers/App/constants'

function* loadStrides ({ api, selectors }) {
  yield put({ type: FETCHING_START })

  let fct = 'stridesMonthGet'
  let { month, dep, page } = selectors
  page = page ? page : 0
  let params = {
    month,
    page
  }

  if (dep) {
    fct = 'stridesMonthDepGet'
    Object.assign(params, { dep })
  }

  let res = yield call(api[fct], params)

  yield put({ type: SET_NB_PAGES, pages: res.data ? res.data.pages : 0 })
  yield put({
    type: SET_STRIDES,
    strides: res.data ? res.data.strides : [],
    refresh: !page
  })

  yield put({ type: FETCHING_END })
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDES, loadStrides)
}
