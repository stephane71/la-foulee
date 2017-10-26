/**
*
* AppHeader
*
*/

import React from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { dominant, tonic, white } from 'colors';

import LaFouleeSVG from 'components/LaFouleeSVG';
import ArrowBack from 'images/ic_arrow_back_white_24px.svg';

import { makeSelectCptLocation } from 'containers/App/selectors';

const HEIGHT_LOGO_APP_HEADER = HEIGHT_APPBAR - 8

const AppHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  max-width: 100vw;
  height: ${HEIGHT_APPBAR}px;
`

const AppHeaderContent = styled.div`
  padding: 0 ${getSpacing(`m`)}px;
  padding-top: 3px;
  background-color: ${dominant};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ArrowBackWrapper = styled.div`
  position: absolute;
  left: ${getSpacing(`m`)}px;
  display: ${({ show }) => show ? `block` : `none`}
`

function AppHeader(props) {
  return (
    <AppHeaderWrapper>
      <AppHeaderContent>
        <Route path={'/foulee/:strideID'} children={({ match, history }) =>
          <ArrowBackWrapper show={match} >
            <ArrowBack
              style={{ fill: white }}
              onClick={() => props.cptLocation < 2 ? history.push('/search') : history.goBack()}
            />
          </ArrowBackWrapper>
        }/>
        <LaFouleeSVG
          height={`${HEIGHT_LOGO_APP_HEADER}px`}
        />
      </AppHeaderContent>
    </AppHeaderWrapper>
  );
}

AppHeader.propTypes = {

};
const mapStateToProps = createStructuredSelector({
  cptLocation: makeSelectCptLocation()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect
)(AppHeader);
