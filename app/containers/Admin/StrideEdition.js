import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { getSpacing } from 'global-styles-variables'

import StrideForm from './StrideForm'

const StrideEditionWrapper = styled.div`
  padding: ${getSpacing(`m`)}px;
  width: 100%;
`

class StrideEdition extends React.Component {

  constructor (props) {
    super(props)

    let { title, date, dep, type, city, url = '' } = this.props.stride
    let momentDate = moment.unix(date)
    this.state = {
      title,
      dep,
      type,
      city,
      url,
      day: momentDate.format('D'),
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      daysInMonth: momentDate.daysInMonth()
    }
  }

  submit = (values) => {
    console.log(values.toJS())
  }

  render () {
    return (
      <StrideEditionWrapper>
        <StrideForm onSubmit={this.submit} initialValues={this.state} onCancel={() => this.props.onCancel()} />
      </StrideEditionWrapper>
    );
  }
}

export default StrideEdition;
