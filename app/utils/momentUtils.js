import moment from 'moment'

moment.locale('fr')
let MONTHS = moment.months().map(m => m[0].toUpperCase() + m.slice(1))

function getNextYearMonthList (offset) {
  let currentYear = moment().year()
  return MONTHS
    .map((m, i) => ({
      id: `${i}-${currentYear + 1}`,
      value: `${m} ${currentYear + 1}`
    }))
}

function getCurrentYearMonthList () {
  let currentMonth = moment().month()
  let currentYear = moment().year()
  let indexes = []
  if (currentYear === 2017)
    return []
  return MONTHS
    .filter((m, i) => i >= currentMonth)
    .map((m, i) => ({
      id: `${currentMonth + i}-${currentYear}`,
      value: `${m}`
    }))
}

const currentMonth = moment().year() === 2017 ? `0-2018` : `${moment().month()}-${moment().year()}`

export {
  getNextYearMonthList,
  getCurrentYearMonthList,
  currentMonth
}
