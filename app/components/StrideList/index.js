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
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { FormattedMessage } from 'react-intl';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { getColor, dominant, white } from 'colors';

import { DATE_FORMAT } from 'utils/enums';
import { HEIGHT_SELECTORS } from 'components/Selectors';

import StrideItem from 'components/StrideItem';
import Loader from 'components/Loader';
import { setCurrentPage } from 'containers/Search/actions';
import {
  makeSelectStrides,
  makeSelectCurrentPage,
  makeSelectNbPages
} from 'containers/Search/selectors';
import { makeSelectFeching } from 'containers/App/selectors';

import messages from './messages';

const WrapperStrideListEmpty = styled.div`
  text-align: center;
  border-top: 1px solid ${getColor('extraLight')};
  padding: ${getSpacing('m')}px;
`

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
    if ((this.props.currentPage + 1) < this.props.pages)
      this.props.setCurrentPage(this.props.currentPage + 1)
  }

  shouldComponentUpdate (nextProps, nextStates) {
    if (nextProps.lock) {
      return false
    }
    return true
  }

  render() {
    if (!this.props.strides.size)
      return (
        <WrapperStrideListEmpty>
          <FormattedMessage {...messages.emptyList} />
        </WrapperStrideListEmpty>
      )

    let end = this.props.currentPage + 1 === this.props.pages

    return (
      <WrapperStrideList>
        {this.props.strides.map((strideList, i) =>
          <div key={i}>
            {i + 1 === this.props.strides.size &&
              <VisibilitySensor
                onChange={isVisible => isVisible && this.onReachStrideListEnd()}
                active={!end && !this.props.loading}
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
          {end && !this.props.loading ?
            <FormattedMessage {...messages.listEnd} />
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
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  desktop: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  strides: makeSelectStrides(),
  currentPage: makeSelectCurrentPage(),
  pages: makeSelectNbPages(),
  loading: makeSelectFeching()
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(StrideList);
// export default StrideList;
