import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUserCredentials } from './selectors';
import { initCredentials, requestAPI } from './actions';

export default (WrappedComponent) => {
  class CredentialComponent extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `credentialProvider(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    constructor (props) {
      super(props)

      this.request = this.request.bind(this)
    }

    componentWillMount () {
      console.log('CredentialComponent: componentWillMount');
      if (!this.props.credentials) {
        console.log('dispatch initCredentials');
        this.props.dispatch(initCredentials())
      }
    }

    request (action, data) {
      // requestAPI manage l'update des credentials
      this.props.dispatch(requestAPI(action, this.props.credentials, data))
    }

    render() {
      return <WrappedComponent request={this.request} {...this.props} />
    }
  }

  const mapStateToProps = createStructuredSelector({
    credentials: makeSelectUserCredentials()
  });

  function mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }

  let wrappedComponent = hoistNonReactStatics(CredentialComponent, WrappedComponent)
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
};
