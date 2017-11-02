import React from 'react';
import styled from 'styled-components';

import { getSpacing } from 'global-styles-variables'

const StrideReadWrapper = styled.div`
  padding: ${getSpacing(`m`)}px;
  width: 100%;
`

function StrideRead(props) {
  return (
    <StrideReadWrapper>
      {props.stride.title} {` + Status + Caractéristiques (Annulée, Inscription ouverte, ...)`}
    </StrideReadWrapper>
  );
}

export default StrideRead;
