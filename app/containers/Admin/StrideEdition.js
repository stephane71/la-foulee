import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Map } from 'immutable'

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

  getPatchedData (data) {
    let patch = {}
    let { title, url, day, month, year, date, dep, city, type, activities, infos, organizer } = this.state

    if (data.title !== title) patch.title = data.title
    if (data.url !== url) patch.url = data.url
    if (data.dep !== dep) patch.dep = data.dep
    if (data.city !== city) patch.city = data.city
    if (data.type !== type) patch.type = data.type
    if (data.infos !== infos) patch.infos = data.infos
    if (!Map(data.organizer).equals(Map(organizer))) patch.organizer = data.organizer
    if (data.day !== day || data.month !== month || data.month !== month)
      patch.date = moment(`${data.day}-${data.month}-${data.year}`, `D-MMMM-YYYY`).unix()
    // !!!! Always patch activities !!!! be carefull
    if (data.activities.length)
      patch.activities = data.activities

    if (patch.dep || patch.date)
      patch.datedep = `${patch.date ? patch.date : date}-${patch.dep ? patch.dep : dep}`

    // !!!! Dernière modif !!!!
    patch.lastUpdate = {
      date: moment().unix(),
      user: 'stef'
    }

    return patch
  }

  submit = (values) => {
    let data = this.getPatchedData(values.toJS())
    this.props.onPatchStride(data)
  }

  render () {
    return (
      <StrideEditionWrapper>
        <AppNoScroll />
        <div>
          <StrideForm
            initialValues={this.state}
            onSubmit={this.submit}
            onCancel={() => this.props.onCancel()}
          />
        </div>
      </StrideEditionWrapper>
    );
  }
}

export default StrideEdition;
