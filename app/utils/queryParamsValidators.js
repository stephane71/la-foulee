import moment from 'moment';

import { MONTH_LIST, DEPARTEMENTS } from 'utils/enums';

let currentMonth = `${moment().month()}-${moment().year()}`

function searchValidators ({ dep, month }) {
  let qs
  if (!MONTH_LIST.find(m => m.id === month))
    month = currentMonth

  qs = { month }
  if (!dep || !DEPARTEMENTS.find(d => d.id === dep))
    dep = null
  else
    Object.assign(qs, { dep })

  return qs
}

export default function getValidator (key) {
  let validators = {
    search: searchValidators
  }

  return validators[key]
}
