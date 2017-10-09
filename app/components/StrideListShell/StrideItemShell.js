import React from 'react';
import styled from 'styled-components';

import { getSpacing } from 'global-styles-variables'
import { white, getColor } from 'colors'

import { WrapperStrideItem, Block, LEFT_BLOCK_WIDTH } from 'components/StrideItem/Layout';

/* 2 x Base Line Height */
let HEIGT = 48

const BlockEmpty = styled(Block)`
  height: ${HEIGT}px;
`

const LeftBlockEmpty = styled(BlockEmpty)`
  width: ${LEFT_BLOCK_WIDTH + getSpacing('s') * 2}px;
`

const ContentBlockEmpty = styled(BlockEmpty)`
  border-left: 1px solid ${getColor('extraLight')};
  flex: 1;
`

const ContentEmpty = styled.div`
  border-radius: 5px;
  background-color: ${getColor('lightGrey', 'tonic')};
  height: 100%;
`

function StrideItemShell() {
  return (
    <WrapperStrideItem>
      <LeftBlockEmpty>
        <ContentEmpty />
      </LeftBlockEmpty>
      <ContentBlockEmpty>
        <ContentEmpty />
      </ContentBlockEmpty>
    </WrapperStrideItem>
  );
}

export default StrideItemShell;
