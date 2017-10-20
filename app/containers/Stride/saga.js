import { takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_STRIDE } from './constants';
import { setStride } from './actions';

const mock = {"date":1509490800,"distances":[{"value":18000,"descriptor":{"d":"18","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1509490800-78","id":"162746cd9b2e71b4ffd5fb8782c9d6d6238551bb","title":"trail'oween","type":"trail","dep":"78"}

function* loadStride ({ api, data }) {
  // const res = yield call(api.strideStrideIDGet, { strideID: data.id })
  const res = yield Promise.resolve({ data: mock })
  console.log(data);
  console.log('Stride:saga -> mock data is running', res);

  console.log(res.data);
  yield put(setStride(res.data))
}


export default function* defaultSaga() {
  yield takeLatest(LOAD_STRIDE, loadStride)
}
