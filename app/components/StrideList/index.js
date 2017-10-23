/**
*
* StrideList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import moment from 'moment';
import { List } from 'immutable';
import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { getColor, dominant, white } from 'colors';

import { DATE_FORMAT } from 'utils/enums';
import { HEIGHT_SELECTORS } from 'components/Selectors';

import StrideItem from 'components/StrideItem';
import Loader from 'components/Loader';

const WrapperStrideList = styled.div`

`

const StrideItemDate = styled.div`
  position: sticky;
  top: ${({ top }) => top}px;
  color: ${white};
  background-color: ${dominant};
  padding: ${getSpacing(`s`)}px ${getSpacing(`m`)}px;
`

const StrideListEndMessage = styled.div`
  border-top: 1px solid ${getColor('extraLight')};
  padding: ${getSpacing(`s`)}px ${getSpacing(`m`)}px;
  text-align: center;
`

class StrideList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onReachStrideListEnd () {
    this.props.onPagination()
  }

  render() {
    if (!this.props.strides.size)
      return <span>{`Pas de résultats pour cette sélection !`}</span>

    return (
      <WrapperStrideList>
        {this.props.strides.map((strideList, i) =>
          <div key={i}>
            {i + 1 === this.props.strides.size &&
              <VisibilitySensor
                onChange={isVisible => isVisible && this.onReachStrideListEnd()}
                active={!this.props.end}
              />
            }
            <StrideItemDate top={this.props.desktop ? HEIGHT_SELECTORS : HEIGHT_APPBAR + HEIGHT_SELECTORS}>
              {moment.unix(strideList.get(0).date).format(DATE_FORMAT)}
            </StrideItemDate>
            {strideList.map((stride, j) =>
              <StrideItem
                key={j}
                data={stride}
                onClick={stride => this.props.onStrideSelect(stride)}
                lastItem={j === strideList.size - 1}
              />
            )}
          </div>
        )}

        <StrideListEndMessage>
          {this.props.end ?
            <span>{`Fin de la liste !`}</span>
          :
            <Loader />
          }
        </StrideListEndMessage>
      </WrapperStrideList>
    );
  }
}

StrideList.propTypes = {
  strides: PropTypes.instanceOf(List).isRequired,
  onStrideSelect: PropTypes.func.isRequired,
  onPagination: PropTypes.func.isRequired,
  end: PropTypes.bool.isRequired,
  desktop: PropTypes.bool
};

export default StrideList;
