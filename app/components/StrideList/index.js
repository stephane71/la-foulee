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

import { DATE_FORMAT } from 'utils/enums';
import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { HEIGHT_SELECTORS } from 'components/Selectors';
import { dominant, white } from 'colors';

import StrideItem from 'components/StrideItem';

const WrapperStrideList = styled.div`

`

const StrideItemDate = styled.div`
  position: sticky;
  top: ${HEIGHT_APPBAR + HEIGHT_SELECTORS}px;
  color: ${white};
  background-color: ${dominant};
  padding: ${getSpacing(`s`)}px ${getSpacing(`m`)}px;
`

class StrideList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    loading: false,
    listEnd: false
  }

  componentWillReceiveProps (nextProps) {
    // !!!! length & size (Immutable) !!!!
    if (this.props.loading && !nextProps.loading) {
      this.setState({
        loading: false,
        listEnd: this.props.strides.length === nextProps.strides.length
      })
    }
  }

  onReachStrideListEnd () {
    this.setState({ loading: true })
    this.props.onPagination()
  }

  render() {
    if (!this.props.strides.size)
      return <span>{`Pas de résultats pour cette sélection !`}</span>

    return (
      <WrapperStrideList>
        {this.props.strides.map((strideList, i) =>
          <div key={i}>
            <StrideItemDate>
              {moment.unix(strideList[0].date).format(DATE_FORMAT)}
            </StrideItemDate>
            {strideList.map((stride, j) =>
              <StrideItem
                key={j}
                data={stride}
                onClick={stride => this.props.onStrideSelect(stride)}
                lastItem={j === strideList.length - 1}
              />
            )}
          </div>
        )}
        <VisibilitySensor
          onChange={isVisible => isVisible && this.onReachStrideListEnd()}
        />
        {this.state.loading ?
          <span>{`Chargement des évennements...`}</span>
        : this.state.listEnd &&
          <span>{`Fin de la liste !`}</span>
        }
      </WrapperStrideList>
    );
  }
}

StrideList.propTypes = {
  strides: PropTypes.instanceOf(List).isRequired,
  onStrideSelect: PropTypes.func.isRequired,
  onPagination: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default StrideList;
