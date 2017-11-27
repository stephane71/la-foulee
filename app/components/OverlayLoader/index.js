/**
*
* OverlayLoader
*
*/

import React from 'react'
import styled from 'styled-components'

import { HEIGHT_APPBAR } from 'global-styles-variables'

import AppNoScroll from 'components/AppNoScroll'
import Loader from 'components/Loader'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vh - ${HEIGHT_APPBAR}px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.80);
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
`

function OverlayLoader() {
  return (
    <Overlay>
      <AppNoScroll />
      <Loader />
    </Overlay>
  );
}

OverlayLoader.propTypes = {

}

export default OverlayLoader
