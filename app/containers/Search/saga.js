import isEmpty from 'lodash.isempty'
import { takeLatest, call, put } from 'redux-saga/effects'
import { LOAD_STRIDES, SET_NB_PAGES, SET_STRIDES } from './constants'
import { FETCHING_START, FETCHING_END } from 'containers/App/constants'


let mock = {"strides":[[{"date":1509490800,"distances":[{"value":18000,"descriptor":{"d":"18","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1509490800-78","id":"162746cd9b2e71b4ffd5fb8782c9d6d6238551bb","title":"trail'oween","type":"trail","dep":"78"}],[{"date":1509750000,"distances":[{"value":18400,"descriptor":{"d":"18.4","unit":"km"}}],"datedep":"1509750000-77","id":"55a747cbe75ab1f8fd9c38bebfe5322da0c1d32d","title":"course verte des bosses du bocage 2017","type":"route","dep":"77"},{"date":1509750000,"distances":[{"value":21000,"descriptor":{"d":"21","unit":"km"}}],"datedep":"1509750000-91","id":"9e81c6d09606deb7941b485b30e0b13e15f4bd37","title":"carrieres by night ( nocturne )","type":"trail","dep":"91"},{"date":1509750000,"distances":[{"value":9200,"descriptor":{"d":"9.2","unit":"km"}}],"datedep":"1509750000-95","id":"df98d262eb8022a89ee54a59469caf78bfc1332a","title":"foulees de beauchamp","type":"route","dep":"95"},{"date":1509750000,"distances":[{"value":14000,"descriptor":{"d":"14","unit":"km"}}],"datedep":"1509750000-95","id":"1fd007e51f108494448ea922b344dcf8ae8253a3","title":"trail de l'enfer des buttes","type":"nature","dep":"95"}],[{"date":1509836400,"distances":[{"value":3218.68,"descriptor":{"d":"2","unit":"miles"}}],"datedep":"1509836400-75","id":"1438273613cf9c00c9941b0ed63fe73e2d43c9bd","title":"2 miles sri chinmoy","type":"route","dep":"75"},{"date":1509836400,"distances":[{"value":42195,"descriptor":{"d":"42.195","unit":"km"}}],"datedep":"1509836400-75","id":"e3418dea87366c515c031bde3f3ffc9532894661","title":"ekiden de paris","type":"route","dep":"75"},{"date":1509836400,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}},{"value":20000,"descriptor":{"d":"20","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1509836400-78","id":"6c5f857b05411d013608f9d0b74d3992c3463997","title":"la course royale","type":"nature","dep":"78"}],[{"date":1510354800,"distances":[{"value":8000,"descriptor":{"d":"8","unit":"km"}}],"datedep":"1510354800-75","id":"f41b320343f7577d96ec60a9700cd05c56dad149","title":"les bacchantes","type":"route","dep":"75"},{"date":1510354800,"distances":[{"value":18000,"descriptor":{"d":"18","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1510354800-78","id":"a5ac6a507b39a0e4e9310b3e51e8119e3149263d","title":"course nocturne les flambeaux","type":"nature","dep":"78"},{"date":1510354800,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}},{"value":5000,"descriptor":{"d":"5000","unit":"m"}},{"value":3100,"descriptor":{"d":"3100","unit":"m"}}],"datedep":"1510354800-93","id":"6d194139a579897fb743739461121083bd7e9308","title":"28 ieme corrida pedestre aulnay sous bois","type":"route","dep":"93"},{"date":1510354800,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1510354800-95","id":"005b70a82837943618a0117cb2e76987e32a517e","title":"foulees goussainvilloises","type":"route","dep":"95"}],[{"date":1510441200,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}},{"value":6000,"descriptor":{"d":"6","unit":"km"}}],"datedep":"1510441200-78","id":"7c14baa8ccfdeae897b4271d6a08889214b9d279","title":"ronde des 10 cotes","type":"route","dep":"78"},{"date":1510441200,"distances":[{"value":35000,"descriptor":{"d":"35","unit":"km"}},{"value":16000,"descriptor":{"d":"16","unit":"km"}},{"value":1000,"descriptor":{"d":"1","unit":"km"}}],"datedep":"1510441200-78","id":"4ebdd6e651ce1f112697d9ace2d464f3ac34eae1","title":"la sans raison","type":"trail","dep":"78"},{"date":1510441200,"distances":[{"value":20000,"descriptor":{"d":"20","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}},{"value":2000,"descriptor":{"d":"2","unit":"km"}}],"datedep":"1510441200-92","id":"82729916cc14bce9c312a3ba2637d5aa505e62d0","title":"foulee de villeneuve la garenne","type":"route","dep":"92"},{"date":1510441200,"distances":[{"value":21500,"descriptor":{"d":"21.5","unit":"km"}},{"value":21500,"descriptor":{"d":"21.5","unit":"km"}}],"datedep":"1510441200-94","id":"07176211b3fad65d47634e30fb23a4c32478731a","title":"la sagittaire","type":"trail","dep":"94"}],[{"date":1510959600,"distances":[{"value":20000,"descriptor":{"d":"20","unit":"km"}},{"value":12000,"descriptor":{"d":"12","unit":"km"}}],"datedep":"1510959600-77","id":"cdab851baf221ad3076ba97ca125d2f629f4ad28","title":"tourn' en nocturne","type":"nature","dep":"77"},{"date":1510959600,"distances":[{"value":19000,"descriptor":{"d":"19","unit":"km"}}],"datedep":"1510959600-91","id":"146f0c5fae9c7887c6ea98d558d4896ed1618c04","title":"la nocturne du lievre et de la tortue","type":"route","dep":"91"},{"date":1510959600,"distances":[{"value":20000,"descriptor":{"d":"20","unit":"km"}},{"value":20000,"descriptor":{"d":"20","unit":"km"}},{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1510959600-95","id":"c53c8d3710105480580c6e6145172ffc3ee6b5a4","title":"fun trail","type":"nature","dep":"95"}],[{"date":1511046000,"distances":[{"value":10000,"descriptor":{"d":"10","unit":"km"}}],"datedep":"1511046000-75","id":"42b25b5676ea488b1dd2861dadf2f479cc564e5b","title":"les boucles du 17eme","type":"route","dep":"75"},{"date":1511046000,"distances":[{"value":13000,"descriptor":{"d":"13","unit":"km"}}],"datedep":"1511046000-78","id":"9f7e7dff02bfc8453e9869498db1fac23ae409fe","title":"maxi cross de la butte verte","type":"nature","dep":"78"},{"date":1511046000,"distances":[{"value":16000,"descriptor":{"d":"16","unit":"km"}}],"datedep":"1511046000-78","id":"1b40e434aa125fcf58e6b1b52d1edd9d7e435a50","title":"la route des 4 chateaux","type":"nature","dep":"78"}]],"pages":2}

function* loadStrides ({ api, selectors }) {
  yield put({ type: FETCHING_START })

  let fct = 'stridesMonthGet'
  let { month, dep, page } = selectors
  page = page ? page : 0
  let params = {
    month,
    page
  }

  if (!isEmpty(dep)) {
    fct = 'stridesMonthDepGet'
    Object.assign(params, { dep })
  }

  // let res = yield call(api[fct], params)
  let res = yield Promise.resolve({ data: mock })
  console.log(selectors);
  console.log('Search:saga -> mock data is running', res)

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
