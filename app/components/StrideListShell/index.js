/**
*
* StrideListShell
*
*/

import React from 'react';
import styled from 'styled-components';

import { getColor } from 'colors';
import StrideItemShell from './StrideItemShell';

const StrideListShellWrapper = styled.div`
  border-top: 1px solid ${getColor(`extraLight`)};
`

function StrideListShell() {
  let items = []
  for (let i = 0; i < 5; i++) {
    items.push(<StrideItemShell key={i} />)
  }

  window.scrollTo(0, 0)

  return (
    <StrideListShellWrapper>
      {items}
    </StrideListShellWrapper>
  )
}

StrideListShell.propTypes = {

};

export default StrideListShell;
