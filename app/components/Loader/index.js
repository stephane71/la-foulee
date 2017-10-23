/**
*
* Loader
*
*/

import React from 'react';
import styled, { keyframes } from 'styled-components';

import { getSpacing } from 'global-styles-variables'
import { dominant, white } from 'colors'

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getSpacing('m')}px;
  user-select: none;
`

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const factors = {
  s: 2,
  m: 4,
}

const Spinner = styled.div`
  display: inline-block;
  width: ${props => props.dimensions};
  height: ${props => props.dimensions};
  border: ${props => props.border} solid ${dominant};
  border-top-color: ${white};
  border-radius: 50%;
  animation: ${rotate360} 0.75s linear infinite;
  cursor: progress;
`

function getFactor (size) {
  return size ? factors[size] : factors[`m`]
}

function Loader(props) {
  let factor = getFactor(props.size)
  return (
    <LoaderWrapper>
      <Spinner dimensions={`${factor * 10}px`} border={`${factor}px`} />
    </LoaderWrapper>
  );
}

Loader.propTypes = {

};

export default Loader;
