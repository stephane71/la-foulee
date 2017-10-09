import moment from 'moment';

import { MONTHS, DEPARTEMENTS } from 'utils/enums';

function searchValidators ({ dep, month }) {
  let qs
  if (!MONTHS.find(m => m.id === month))
    month = String(moment().month())

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
