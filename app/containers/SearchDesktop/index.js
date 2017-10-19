/**
 *
 * SearchDesktop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { getColor } from 'colors';

import Search from 'containers/Search';
import Stride from 'containers/Stride';

const SearchDesktopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const SearchSide = styled.div`
  width: 30%;
  border-right: 1px solid ${getColor('extraLight')};
  overflow-y: auto;
`

const StrideSelected = styled.div`
  width: 70%;
  overflow-y: auto;
`

export class SearchDesktop extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount () {
    document.getElementById(`app`).classList.add('no-scroll')
  }

  componentWillUnmount() {
    document.getElementById(`app`).classList.remove('no-scroll')
  }

  render() {
    return (
      <SearchDesktopWrapper>

        <SearchSide>
          <Search {...this.props} desktop />
        </SearchSide>
        <StrideSelected>
          <Stride {...this.props} desktop />
        </StrideSelected>

      </SearchDesktopWrapper>
    );
  }
}

SearchDesktop.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchDesktop);
