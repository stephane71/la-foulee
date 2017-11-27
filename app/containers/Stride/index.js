/**
 *
 * Stride
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import HelmetIntl from 'components/HelmetIntl';
import StridePage from 'components/StridePage';
import ScrollToTopOnMount from 'components/ScrollToTopOnMount';
import OverlayLoader from 'components/OverlayLoader';

import makeSelectStride from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { setStride, loadStride } from './actions';

const StrideWrapper = styled.div`
  position: relative;
  height: 100%;
`

export class Stride extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    loading: true
  }

  componentWillMount () {
    if (this.props.match.params.strideKeyword) {
      let strideInRoute = this.props.location.state && this.props.location.state.stride
      this.setStride(strideInRoute, this.props.match.params.strideKeyword)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stride.title !== nextProps.stride.title) {
      this.setState({
        loading: false
      })
    }
    if (this.props.desktop && (this.props.match.params.strideKeyword !== nextProps.match.params.strideKeyword)) {
      let strideInRoute = nextProps.location.state && nextProps.location.state.stride
      this.setStride(strideInRoute, nextProps.match.params.strideKeyword)
    }
  }

  setStride (stride, strideKeyword = null) {
    if (stride) {
      this.props.setStride(stride)
      this.setState({
        loading: false
      })
    } else if (strideKeyword)
      this.props.request(loadStride, { id: strideKeyword })
  }

  render() {
    let title = Object.assign({}, messages.headerTitle, {
      values: {
        race: this.props.stride.title
      }})

    return (
      <StrideWrapper>
        <ScrollToTopOnMount />

        {this.props.stride.title &&
          <HelmetIntl title={title} content={messages.headerContent} />
        }

        {this.state.loading ?
          <OverlayLoader />
        :
          <StridePage stride={this.props.stride} />
        }
      </StrideWrapper>
    );
  }
}

Stride.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setStride: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  stride: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  stride: makeSelectStride()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setStride: (stride) => dispatch(setStride(stride))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'stride', reducer });
const withSaga = injectSaga({ key: 'stride', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Stride);
