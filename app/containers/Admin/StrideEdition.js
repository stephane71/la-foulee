import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Map } from 'immutable'
import { reducer as formReducer } from 'redux-form/immutable';
import { compose } from 'redux';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables'
import { white } from 'colors'

import injectReducer from 'utils/injectReducer';

import AppNoScroll from 'components/AppNoScroll';

import StrideForm from './StrideForm'

const StrideEditionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${getSpacing(`m`)}px;
  overflow-y: auto;
`

class StrideEdition extends React.Component {

  getInitialFormValues (stride) {
    let momentDate = moment.unix(stride.date)
    return Object.assign({}, stride, {
      day: momentDate.format('D'),
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      daysInMonth: momentDate.daysInMonth()
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location) {
      if (nextProps.location.state)
        this.setState(this.getInitialFormValues(nextProps.location.state.stride))
    }
  }

  getPatchedData (data) {
    let patch = {}
    let { title, keyword, day, month, year, date, dep, city, type, activities, infos, organizer, inscription } = this.state

    if (data.title !== title) patch.title = data.title
    if (data.keyword !== keyword) patch.keyword = data.keyword
    if (data.dep !== dep) patch.dep = data.dep
    if (data.city !== city) patch.city = data.city
    if (data.type !== type) patch.type = data.type
    if (data.infos !== infos) patch.infos = data.infos
    if (data.inscription !== inscription) patch.inscription = data.inscription
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
    this.props.onPatchStride(this.props.stride.id, data)
  }

  render () {
    return (
      <StrideEditionWrapper>
        <AppNoScroll />
        <div>
          <StrideForm
            initialValues={this.state}
            enableReinitialize={true}
            onSubmit={this.submit}
            onCancel={() => this.props.onCancel()}
          />
        </div>
      </StrideEditionWrapper>
    );
  }
}

const withReducerReduxForm = injectReducer({ key: 'form', reducer: formReducer });

export default compose(
  withReducerReduxForm
)(StrideEdition);
