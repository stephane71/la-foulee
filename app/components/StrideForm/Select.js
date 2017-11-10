import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { List } from 'immutable'

import { getSpacing } from 'global-styles-variables'
import { DEPARTEMENTS } from 'utils/enums'

import ArrowDropDown from 'images/background-images/ic_arrow_drop_down_black_24px.svg'

const DAYS_IN_MONTH = 30

const OptionsDateDay = List().set(DAYS_IN_MONTH).map((e, i) => <option key={i} value={i+1}>{i + 1}</option>)
const OptionsDateMonth = moment.months().map((m, i) => <option key={i} value={m}>{m}</option>)
const OptionsDateYear = ['2017', '2018'].map((y, i) => <option key={i} value={y}>{y}</option>)

const getOptions = (name, dateElement) => {
  let options = []
  if (name === 'date') {
    if (dateElement === 'day') options = OptionsDateDay
    if (dateElement === 'month') options = OptionsDateMonth
    if (dateElement === 'year') options = OptionsDateYear
  }
  else if (name === 'dep')
    options = DEPARTEMENTS.map((dep, i) =>
      <option key={i} value={dep.id}>{dep.value}</option>)
  else if (name === 'type')
    options = ['trail', `route`].map((type, i) =>
      <option key={i} value={type}>{type}</option>)

  return options
}

const SelectWrapper = styled.select`
  appearance: none;
  outline: 0;
  padding: ${getSpacing('s')}px;
  text-decoration: none;
  width: 100%;
  background-image: url(${ArrowDropDown});
  background-position: calc(100% - ${getSpacing('s')}px);
  border: 1px solid black;
`

const Select = props =>
  <SelectWrapper {...props}>
    { getOptions(props.name, props.dateElement) }
  </SelectWrapper>

export default Select
export { getOptions }
