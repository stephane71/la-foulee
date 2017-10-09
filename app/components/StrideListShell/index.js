/**
*
* StrideListShell
*
*/

import React from 'react';

import StrideItemShell from './StrideItemShell';

function StrideListShell() {
  let items = []
  for (let i = 0; i < 5; i++) {
    items.push(<StrideItemShell key={i} />)
  }

  return (
    <div>
      {items}
    </div>
  )
}

StrideListShell.propTypes = {

};

export default StrideListShell;
