import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables'
import { white } from 'colors'

import AppNoScroll from 'components/AppNoScroll';

import StrideForm from './StrideForm'

const StrideEditionWrapper = styled.div`
  z-index: 1000;
  background-color: ${white};
  position: fixed;
  top: ${HEIGHT_APPBAR}px;
  left: 0;
  height: calc(100vh - ${HEIGHT_APPBAR}px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${getSpacing(`m`)}px;
  overflow-y: auto;
`

class StrideEdition extends React.Component {

  constructor (props) {
    super(props)

    let momentDate = moment.unix(this.props.stride.date)
    this.state = Object.assign({}, this.props.stride, {
      day: momentDate.format('D'),
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      daysInMonth: momentDate.daysInMonth()
    })
  }

  submit = (values) => {
    console.log(values.toJS())
  }

  render () {
    return (
      <StrideEditionWrapper>
        <AppNoScroll />
        <div>
          <StrideForm onSubmit={this.submit} initialValues={this.state} onCancel={() => this.props.onCancel()} />
        </div>
      </StrideEditionWrapper>
    );
  }
}

export default StrideEdition;
