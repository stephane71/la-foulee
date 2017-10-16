import { takeLatest, call, put } from 'redux-saga/effects'
import isEmpty from 'lodash.isempty'
import { LOAD_STRIDES, SET_NB_PAGES, SET_STRIDES } from './constants'

let mock = {"strides":[[{"date":1509836400,"distances":[{"value":3218.68,"descriptor":{"d":"2","unit":"miles"}}],"datedep":"1509836400-75","id":"1438273613cf9c00c9941b0ed63fe73e2d43c9bd","title":"2 miles sri chinmoy","type":"route","dep":"75"},{"date":1509836400,"distances":[{"value":42195,"descriptor":{"d":"42.195","unit":"km"}}],"datedep":"1509836400-75","id":"e3418dea87366c515c031bde3f3ffc9532894661","title":"ekiden de paris","type":"route","dep":"75"}],[{"date":1510354800,"distances":[{"value":8000,"descriptor":{"d":"8","unit":"km"}}],"datedep":"1510354800-75","id":"f41b320343f7577d96ec60a9700cd05c56dad149","title":"les bacchantes","type":"route","dep":"75"}],[{"date":1511046000,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1511046000-75","id":"42b25b5676ea488b1dd2861dadf2f479cc564e5b","title":"les boucles du 17eme","type":"route","dep":"75"}]],"pages":1}

function* loadStrides ({ api, selectors }) {
    let fct = 'stridesMonthGet'
    let params = {
      month: selectors.month,
      page: 0
    }

    if (!isEmpty(selectors.dep)) {
      fct = 'stridesMonthDepGet'
      Object.assign(params, { dep: selectors.dep })
    }

    // let res = yield call(api[fct], params)
    let res = { data: mock }
    console.log(res);

    yield put({ type: SET_NB_PAGES, pages: res.data.pages })
    yield put({ type: SET_STRIDES, strides: res.data.strides })
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDES, loadStrides)
}
