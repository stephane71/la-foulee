import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Map, List } from 'immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { compose } from 'redux'

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables'
import { white } from 'colors'

import injectReducer from 'utils/injectReducer'

import AppNoScroll from 'components/AppNoScroll'

import StrideForm from './StrideForm'

import { patchStride } from './actions'

const StrideEditionWrapper = styled.div`
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

    this.state = this.getInitialFormValues(this.props.stride)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stride !== nextProps.stride) {
      this.setState(this.getInitialFormValues(nextProps.stride))
    }
  }

  getInitialFormValues (stride) {
    let momentDate = moment.unix(stride.date)
    return Object.assign({}, stride, {
      day: momentDate.format('D'),
      month: momentDate.format('MMMM'),
      year: momentDate.format('YYYY'),
      daysInMonth: momentDate.daysInMonth()
    })
  }

  isActivitiesChanged (newActivities, currentActivities) {
    let newActivitiesList = List(newActivities.map(a => Map(a)))
    let currentActivitiesList = List(currentActivities.map(a => Map(a)))

    return !newActivitiesList.equals(currentActivitiesList)
  }

  getPatchedData (data) {
    let patch = {}
    let { title, keyword, day, month, year, date, dep, city, type, activities,
          infos, organizer, inscription, address } = this.state
    // GLOBAL
    if (data.title !== title) patch.title = data.title
    if (data.keyword !== keyword) patch.keyword = data.keyword
    if (data.day !== day || data.month !== month || data.month !== month)
      patch.date = moment(`${data.day}-${data.month}-${data.year}`, `D-MMMM-YYYY`).unix()
    if (data.type !== type) patch.type = data.type
    // LOCATION
    if (data.address !== address) patch.address = data.address
    if (data.dep !== dep) patch.dep = data.dep
    if (data.city !== city) patch.city = data.city
    //
    if (data.infos !== infos) patch.infos = data.infos
    if (data.inscription !== inscription) patch.inscription = data.inscription
    //
    if (!Map(data.organizer).equals(Map(organizer))) patch.organizer = data.organizer
    // !!!! Always patch activities !!!! be carefull
    if (this.isActivitiesChanged(data.activities, activities))
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
    let strideID = this.props.location.state.stride.id
    console.log('Patch stride:', strideID, data)

    this.props.request(patchStride, { strideID, data })
  }

  render () {
    if (!this.state.title)
      return (
        <h5>{`Please select a stride`}</h5>
      )

    return (
      <StrideEditionWrapper>
        {/* <AppNoScroll /> */}
        <div>
          <StrideForm
            initialValues={this.state}
            enableReinitialize={true}
            onSubmit={data => this.submit(data)}
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
