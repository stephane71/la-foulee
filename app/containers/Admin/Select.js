import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { List } from 'immutable'

import { getSpacing } from 'global-styles-variables'
import { DEPARTEMENTS } from 'utils/enums'

import ArrowDropDown from 'images/background-images/ic_arrow_drop_down_black_24px.svg'

const getOptions = (name, daysInMonth) => {
  let options = []
  if (name === 'day')
    options = List().set(daysInMonth).map((e, i) =>
      <option key={i} value={i+1}>{i + 1}</option>
    )
  else if (name === 'month')
    options = moment.months().map((m, i) =>
      <option key={i} value={m}>{m}</option>
    )
  else if (name === 'year')
    options = ['2017', '2018'].map((y, i) =>
      <option key={i} value={y}>{y}</option>
    )
  else if (name === 'dep')
    options = DEPARTEMENTS.map((dep, i) =>
      <option key={i} value={dep.id}>{dep.value}</option>
    )
  else if (name === 'type')
    options = ['trail', `route`].map((type, i) =>
      <option key={i} value={type}>{type}</option>
    )

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
    { getOptions(props.name, 30) }
  </SelectWrapper>

export default Select
export { getOptions }
