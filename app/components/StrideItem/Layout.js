import styled from 'styled-components';

import { getSpacing } from 'global-styles-variables'
import { white, black, getColor } from 'colors'

export let LEFT_BLOCK_WIDTH= 64

export const WrapperStrideItem = styled.div`
  padding: ${getSpacing('s')}px;
  display: flex;
  align-items: center;
  background-color: ${getColor('dark')};
  color: ${white};
  border-bottom: ${({ borderBottom }) => borderBottom ? `1px solid ${black}` : `0` };
`;

export const Block = styled.div`
  padding: 0 ${getSpacing('s')}px;
`

export const LeftBlock = styled(Block)`
  width: ${LEFT_BLOCK_WIDTH + getSpacing('s') * 2}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContentBlock = styled(Block)`
  border-left: 1px solid ${getColor('extraLight')};
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ContentBlockStride = styled.div`
  max-width: calc(100% - 24px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
