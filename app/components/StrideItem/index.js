/**
*
* StrideItem
*
*/

import React from 'react';

import ArrowRightBlack from 'images/ic_keyboard_arrow_right_black_24px.svg';

import { WrapperStrideItem, LeftBlock, ContentBlock, ContentBlockStride } from './Layout';
import { Dep, Type, Title, Races } from './Elements';

function StrideItem(props) {
  let { id, dep, type, title, distances } = props.data
  return (
    <WrapperStrideItem onClick={event => { event.stopPropagation(); props.onClick(props.data); }}>

      <LeftBlock>
        <Dep>{dep}</Dep>
        <Type>{type}</Type>
      </LeftBlock>

      <ContentBlock>
        <ContentBlockStride>
          <Title>{title}</Title>
          <Races>{'liste... TODO'}</Races>
        </ContentBlockStride>
        <ArrowRightBlack />
      </ContentBlock>

    </WrapperStrideItem>
  );
}

StrideItem.propTypes = {

};

export default StrideItem;
