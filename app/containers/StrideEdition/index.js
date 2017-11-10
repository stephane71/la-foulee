/**
 *
 * StrideEdition
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

import { getSpacing } from 'global-styles-variables'

import StrideForm from 'components/StrideForm'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectStrideEdition from './selectors'
import reducer from './reducer'
import saga from './saga'

import { patchStride } from './actions'

const StrideEditionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${getSpacing(`m`)}px;
  overflow-y: auto;
`

export class StrideEdition extends React.Component { // eslint-disable-line react/prefer-stateless-function

  getPatchData (values, initialValues) {
    // TRIM des input text !!!!!
    let patch = {}
    let attributes = ['title', 'keyword', 'date', 'type', 'address', 'city', 'dep', 'infos', 'inscription']
    let immutableAttributes = ['activities', 'organizer']

    attributes.forEach(attr => {
      if (values.get(attr) !== initialValues.get(attr))
        patch[attr] = values.get(attr)
    })

    immutableAttributes.forEach(attr => {
      if (!values.get(attr).equals(initialValues.get(attr))) {
        patch[attr] = values.get(attr).toJS()
      }
    })

    patch.lastUpdate = {
      date: moment().unix(),
      user: 'stef'
    }
    return patch
  }

  sanitizePatchData (data) {
    let patch = Object.assign({}, data)

    // In DynamoDB you can't submit an empty string: We have to delete empty properties
    // "String and Binary type attributes must have lengths greater than zero."
    // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
    if (patch.organizer) {
      if (!patch.organizer.name) delete patch.organizer.name
      if (!patch.organizer.phone) delete patch.organizer.phone
      if (!patch.organizer.email) delete patch.organizer.email
      if (!patch.organizer.website) delete patch.organizer.website
    }

    return patch
  }

  submit = (values, initialValues) => {
    let data = this.getPatchData(values, initialValues)
    data = this.sanitizePatchData(data)

    let strideID = this.props.location.state.stride.id
    console.log('Patch stride:', strideID, data)
    this.props.request(patchStride, { strideID, data })
  }

  render () {
    if (!this.props.stride.title)
      return (
        <h5>{`Please select a stride`}</h5>
      )

    return (
      <StrideEditionWrapper>
        <div>
          <StrideForm
            initialValues={this.props.stride}
            enableReinitialize={true}
            onSubmit={(values, dispatch, { initialValues }) => this.submit(values, initialValues)}
            onCancel={() => this.props.onCancel()}
          />
        </div>
      </StrideEditionWrapper>
    );
  }
}

StrideEdition.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  strideEdition: makeSelectStrideEdition(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducerReduxForm = injectReducer({ key: 'form', reducer: formReducer })

const withReducer = injectReducer({ key: 'strideEdition', reducer });
const withSaga = injectSaga({ key: 'strideEdition', saga });

export default compose(
  withReducer,
  withReducerReduxForm,
  withSaga,
  withConnect,
)(StrideEdition);
