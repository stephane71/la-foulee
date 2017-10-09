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
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dominant } from 'colors';

import StridePage from 'components/StridePage';

import makeSelectStride from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const StrideWrapper = styled.div`
  height: 100%;
`

export class Stride extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    loading: true,
  }

  componentWillMount () {
    console.log('Stride: componentWillMount', this.props.location.state);

    let isEmpty = !(this.props.location.state && this.props.location.state.stride)
    // if (isEmpty)
    //   this.loadStride(this.props.location.pathname.split('/')[2])
    this.setState({
      loading: isEmpty
    })

    setTimeout(() => this.setState({ loading: false }), 2000)
  }

  render() {
    let stride = this.props.location.state && this.props.location.state.stride || this.props.stride

    return (
      <StrideWrapper>
        <Helmet>
          <title>{`Foulée`}</title>
          <meta name={`description`} content={`Description of a Stride`} />
        </Helmet>
        {this.state.loading ?
          <span>{`Loading...`}</span>
        :
          <StridePage stride={stride} />
        }
      </StrideWrapper>
    );
  }
}

Stride.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  stride: makeSelectStride(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
