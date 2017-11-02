import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUserCredentials } from './selectors';
import { initCredentials, updateCredentials, requestAPI } from './actions';

function getApiClient (credentials) {
  return apigClientFactory.newClient({
    accessKey: credentials.accessKeyId,
    secretKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: 'eu-west-1'
  })
}

export default (WrappedComponent) => {
  class CredentialComponent extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `credentialProvider(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    constructor (props) {
      super(props)

      this.request = this.request.bind(this)
      this.api = null
      this.pendingRequests = []
    }

    componentWillMount () {
      if (!this.props.credentials)
        this.props.initCredentials()
    }

    componentWillReceiveProps (nextProps) {
      if (this.pendingRequests.length) {
        if ((!this.props.credentials && nextProps.credentials) ||
            this.credentialsHasBeenRefreshed(this.props.credentials, nextProps.credentials)) {
          this.triggerPendingRequests(this.getApi(nextProps.credentials))
        }
      }
    }

    credentialsHasBeenRefreshed(credentials, nextCredentials) {
      return credentials && nextCredentials &&
        credentials.needsRefresh() &&
        !nextProps.credentials.needsRefresh()
    }

    getApi (credentials) {
      this.api = this.api ? this.api : getApiClient(credentials)
      return this.api
    }

    request (action, data) {
      if (!this.props.credentials) {
        this.pendingRequests.push({ action, data })
        return
      }

      if (this.props.credentials.needsRefresh()) {
        this.props.updateCredentials(this.props.credentials)
        this.pendingRequests.push({ action, data })
        return
      }

      this.props.requestAPI(this.getApi(this.props.credentials), action, data)
    }

    triggerPendingRequests (api) {
      let requests = Object.assign([], this.pendingRequests)
      this.pendingRequests = []
      requests.map(({ action, data }) => {
        this.props.requestAPI(api, action, data)
      })
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
      initCredentials: () => dispatch(initCredentials()),
      requestAPI: (api, action, data) => dispatch(requestAPI(api, action, data)),
      updateCredentials: (credentials) => dispatch(updateCredentials(credentials))
    };
  }

  let wrappedComponent = hoistNonReactStatics(CredentialComponent, WrappedComponent)
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
};
