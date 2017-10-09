/**
*
* AppHeader
*
*/

import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { dominant, tonic, white } from 'colors';

import LaFouleeSVG from 'components/LaFouleeSVG';
import ArrowBack from 'images/ic_arrow_back_white_24px.svg';

const HEIGHT_LOGO_APP_HEADER = HEIGHT_APPBAR - getSpacing(`s`) * 2

const AppHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  max-width: 100vw;
`

const AppHeaderContent = styled.div`
  padding: ${getSpacing(`s`)}px ${getSpacing(`m`)}px;
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
              onClick={() => history.push(`/search`)} />
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

export default AppHeader;
