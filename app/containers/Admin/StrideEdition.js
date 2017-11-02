import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { List } from 'immutable'

import { getSpacing } from 'global-styles-variables'
import { DEPARTEMENTS } from 'utils/enums'

import ArrowDropDown from 'images/background-images/ic_arrow_drop_down_black_24px.svg'

import Input from './Input';

const StrideEditionWrapper = styled.div`
  padding: ${getSpacing(`m`)}px;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StrideAttr = styled.div`
  padding: ${getSpacing(`s`)}px;
`

const StrideAttrDate = styled(StrideAttr)`
  display: flex;
`

const Select = styled.select`
  appearance: none;
  outline: 0;
  padding: ${getSpacing('s')}px;
  text-decoration: none;
  width: 100%;
  background-image: url(${ArrowDropDown});
  background-position: calc(100% - ${getSpacing('s')}px);
  border: 1px solid black;
`

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

class StrideEdition extends React.Component {

  constructor (props) {
    super(props)

    let { title, date, dep, type } = this.props.stride
    let momentDate = moment.unix(date)
    this.state = {
      title,
      dep,
      type,
      day: momentDate.format('D'),
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      daysInMonth: momentDate.daysInMonth()
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    console.log('submit changes');
    event.preventDefault();
  }

  handleChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render () {
    const SelectWrapper = ({ daysInMonth, ...props}) =>
      <Select {...props} onChange={this.handleChange}>
          {getOptions(props.name, this.state.daysInMonth)}
      </Select>

    return (
      <StrideEditionWrapper>
        <Form onSubmit={this.handleSubmit}>
          <StrideAttr>
            <Input type={`text`} name={`title`} value={this.state.title} onChange={this.handleChange} />
          </StrideAttr>
          <StrideAttrDate>
            <SelectWrapper name={`day`} value={this.state.day} style={{ marginRight: `${getSpacing(`s`)}px` }} />
            <SelectWrapper name={`month`} value={this.state.month} style={{ marginRight: `${getSpacing(`s`)}px` }} />
            <SelectWrapper name={`year`} value={this.state.year} />
          </StrideAttrDate>
          <StrideAttr>
            <SelectWrapper name={`dep`} value={this.state.dep} />
          </StrideAttr>
          <StrideAttr>
            <SelectWrapper name={`type`} value={this.state.type} />
          </StrideAttr>
          <button type={`submit`} value={`Submit`}>{`Valider`}</button>
        </Form>
      </StrideEditionWrapper>
    );
  }
}

export default StrideEdition;
