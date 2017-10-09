/**
*
* LaFouleeSvg
*
*/

import React from 'react';
import styled from 'styled-components';

import LogoTonic from 'images/lafoulee-tonic.svg';
// import '!!style-loader!css-loader!components/LaFouleeSvg/LogoStyles.css';

const LOGO_MAX_HEIGHT = 120

function LaFouleeSvg(props) {
  // let style = props.height ? { height: props.height } : {}
  let height = props.height ? props.height : LOGO_MAX_HEIGHT
  return (
    <LogoTonic height={height} style={{...props.style}} />
  );
}

LaFouleeSvg.propTypes = {

};

export default LaFouleeSvg;
