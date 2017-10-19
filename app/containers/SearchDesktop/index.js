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
import { HEIGHT_APPBAR } from 'global-styles-variables';

import Search from 'containers/Search';
import Stride from 'containers/Stride';

const SearchDesktopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const ScrollBase = styled.div`
  overflow-y: auto;
  position: absolute;
  top: ${HEIGHT_APPBAR}px;
  left: 0;
  right: 0;
  bottom: 0;
`

let sideBlockWidth = 35
const SearchSide = styled(ScrollBase)`
  width: ${sideBlockWidth}%;
  border-right: 1px solid ${getColor('extraLight')};
`

const StrideSelected = styled(ScrollBase)`
  width: ${100 - sideBlockWidth}%;
  left: ${sideBlockWidth}%;
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
