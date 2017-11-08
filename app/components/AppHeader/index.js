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
const ICONS_WIDTH = 24
/*
 * This calculation is based on this pattern:
 *  | Icon | Logo | Icon |
 * Each Icon: 24 px + 12px padding (right & left)
 * Content padding: 12 px (right & left)
 */
const WIDTH_DIFF_CENTER_LOGO_WRAPPER = ICONS_WIDTH * 2 + getSpacing(`s`) * 4 + getSpacing(`s`) * 2

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
  padding: 0 ${getSpacing(`s`)}px;
  background-color: ${dominant};
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ArrowBackWrapper = styled.div`
  visibility: ${({ show }) => show ? `visible` : `hidden`};
  padding: ${getSpacing('s')}px;
`

const LaFouleeSVGWrapper = styled.div`
  width: calc(100% - ${WIDTH_DIFF_CENTER_LOGO_WRAPPER}px);
  text-align: center;
`

function AppHeader(props) {
  return (
    <AppHeaderWrapper>
      <AppHeaderContent>
        <Route path={'/foulee/:strideID'} children={({ match, history }) =>
          <ArrowBackWrapper
            show={match}
            onClick={() => props.cptLocation < 2 ? history.push('/search') : history.goBack()} >
              <ArrowBack style={{ fill: white }} />
          </ArrowBackWrapper>
        }/>
        <LaFouleeSVGWrapper>
          <LaFouleeSVG
            height={`${HEIGHT_LOGO_APP_HEADER}px`}
          />
        </LaFouleeSVGWrapper>
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
