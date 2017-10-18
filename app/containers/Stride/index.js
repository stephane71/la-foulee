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
    let strideInRoute = this.props.location.state && this.props.location.state.stride
    // IF: store && route state empty => requests
    if (this.props.stride.title && !strideInRoute) {
      this.props.request(loadStride, { id: this.props.location.pathname.split('/')[2] })
    } else if (strideInRoute) {
      this.props.setStride(strideInRoute)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stride.title !== nextProps.stride.title) {
      this.setState({
        loading: false
      })
    }
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
          <Overlay>{`Chargement des données...`}</Overlay>
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
