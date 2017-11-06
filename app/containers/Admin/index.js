/**
 *
 * Admin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getSpacing } from 'global-styles-variables';

import { setUserAdmin } from 'containers/App/actions';

import StrideEdition from './StrideEdition';

const AdminWrapper = styled.div`
  padding: ${getSpacing(`m`)}px;
`

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function

  setUserAdmin () {
    this.props.dispatch(setUserAdmin())
    this.props.history.replace('/search')
  }

  render() {
    let strides = []
    return (
      <AdminWrapper>
        <button onClick={() => this.setUserAdmin()}>{`Edit`}</button>
      </AdminWrapper>
    );
  }
}

Admin.propTypes = {

}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Admin)
