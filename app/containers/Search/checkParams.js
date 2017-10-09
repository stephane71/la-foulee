import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import qs from 'query-string';
import { Map } from 'immutable';

import getValidator from 'utils/queryParamsValidators';

export default ({ key, action }) => (WrappedComponent) => {
  class ParamsValidator extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `checkParams(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    validateQueryParams (selectors) {
      let validatorFct = getValidator(key)
      selectors = validatorFct(selectors)

      this.props.history.replace({
        search: `?${qs.stringify(selectors)}`,
        state: this.props.location.state
      })

      this.props.dispatch(action(Map(selectors)))
    }

    render() {
      return <WrappedComponent validateQueryParams={this.validateQueryParams.bind(this)} {...this.props} />;
    }
  }

  return hoistNonReactStatics(ParamsValidator, WrappedComponent);
};
