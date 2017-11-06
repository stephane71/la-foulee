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
import { listBorderColor } from 'colors';
import { HEIGHT_APPBAR } from 'global-styles-variables';

import AppNoScroll from 'components/AppNoScroll';

import Search from 'containers/Search'
import Stride from 'containers/Stride'
import StrideEdition from 'containers/Admin/StrideEdition'

const SearchDesktopWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

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
  border-right: 1px solid ${listBorderColor};
`

const StrideSelected = styled(ScrollBase)`
  width: ${100 - sideBlockWidth}%;
  left: ${sideBlockWidth}%;
`

export class SearchDesktop extends React.Component { // eslint-disable-line react/prefer-stateless-function

  onSearchUpdating (started) {
    if (started) {
      this.searchSide.scrollTo(0,0)
      this.searchSide.classList.add('no-scroll')
    } else {
      this.searchSide.classList.remove('no-scroll')
    }
  }

  render() {
    return (
      <SearchDesktopWrapper>

        <AppNoScroll />

        <SearchSide innerRef={searchSide => { this.searchSide = searchSide; }}>
          <Search {...this.props} desktop isUpdating={(started) => this.onSearchUpdating(started)} />
        </SearchSide>
        <StrideSelected>
          {this.props.userAdmin ?
            <StrideEdition {...this.props} />
          :
            <Stride {...this.props} desktop />
          }
        </StrideSelected>

      </SearchDesktopWrapper>
    );
  }
}

SearchDesktop.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    userAdmin: state.getIn(['user','admin'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchDesktop);
