/**
*
* Input
*
*/

import styled from 'styled-components';

import { getSpacing } from 'global-styles-variables';
import { getColor } from 'colors';

const Input = styled.input`
  display: inline-block;
  padding: ${getSpacing(`s`)}px;
  vertical-align: middle;
  border: 1px solid ${() => getColor(`darkGrey`, `tonic`)};
  border-radius: 4px;
  transition: border .2s ease-in-out;
  appearance: none;
  width: 100%;

  &:focus {
    border-color: ${getColor(`dark`)};
    outline: none;
  }
`;

export default Input;
