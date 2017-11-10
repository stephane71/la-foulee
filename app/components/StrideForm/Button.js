import styled from 'styled-components';

import { getSpacing } from 'global-styles-variables';

const Button = styled.button`
  display: inline-block;
  position: relative;
  padding: ${getSpacing(`s`)}px ${getSpacing(`m`)}px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  outline: 0;
  transition: background-color .2s ease-out, box-shadow .05s ease-out, color .1s ease-out;
  appearance: none;
`;

export default Button;
