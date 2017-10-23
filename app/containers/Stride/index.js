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
import { dominant } from 'colors';

import HelmetIntl from 'components/HelmetIntl';
import StridePage from 'components/StridePage';
import ScrollToTopOnMount from 'components/ScrollToTopOnMount';
import Loader from 'components/Loader';

import makeSelectStride from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { setStride, loadStride } from './actions';

const StrideWrapper = styled.div`
  position: relative;
  height: 100%;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.80);
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
`

export class Stride extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    loading: true
  }

  componentWillMount () {
    if (this.props.match.params.strideID) {
      let strideInRoute = this.props.location.state && this.props.location.state.stride
      this.setStride(strideInRoute, this.props.match.params.strideID)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stride.title !== nextProps.stride.title) {
      this.setState({
        loading: false
      })
    }
    if (this.props.desktop && (this.props.match.params.strideID !== nextProps.match.params.strideID)) {
      let strideInRoute = nextProps.location.state && nextProps.location.state.stride
      this.setStride(strideInRoute, nextProps.match.params.strideID)
    }
  }

  setStride (stride, strideID = null) {
    if (stride) {
      this.props.setStride(stride)
      this.setState({
        loading: false
      })
    } else if (strideID)
      this.props.request(loadStride, { id: strideID })
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
          <Overlay>
            <Loader />
          </Overlay>
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
  stride: makeSelectStride(),
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
