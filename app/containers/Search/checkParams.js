import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import qs from 'query-string';
import { Map } from 'immutable';

import getValidator from 'utils/queryParamsValidators';

export default ({ key }) => (WrappedComponent) => {
  class ParamsValidator extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `checkParams(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    getValidParams () {
      let params = qs.parse(window.location.search)
      return getValidator(key)(params)
    }

    replaceCurrentLocationSearch () {
      let params = this.getValidParams()
      let search = `?${qs.stringify(params)}`

      if (search !== window.location.search) {
        this.props.history.replace({
          search,
          state: this.props.location.state
        })
      }
      return params
    }

    pushLocationSearch (params) {
      params = getValidator(key)(params)
      let search = `?${qs.stringify(params)}`
      this.props.history.push({
        search,
        state: this.props.location.state
      })
    }

    render() {
      return <WrappedComponent
        getValidParams={this.getValidParams.bind(this)}
        pushLocationSearch={this.pushLocationSearch.bind(this)}
        replaceCurrentLocationSearch={this.replaceCurrentLocationSearch.bind(this)}
        {...this.props}
      />
    }
  }

  return hoistNonReactStatics(ParamsValidator, WrappedComponent);
};
