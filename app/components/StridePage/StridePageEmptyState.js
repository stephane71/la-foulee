import React from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'global-styles-variables';

import messages from './messages';

const StridePageEmptyStateWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: ${getSpacing(`ls`)}px;
`

function StridePageEmptyState(props) {

  return (
    <StridePageEmptyStateWrapper>
      <p><FormattedMessage {...messages.strideNotFound} /></p>
    </StridePageEmptyStateWrapper>
  )
}


export default StridePageEmptyState;
