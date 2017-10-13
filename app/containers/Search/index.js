/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'query-string'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Map } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MONTHS, DEPARTEMENTS } from 'utils/enums';

import Selectors from 'components/Selectors';
import StrideList from 'components/StrideList';
import StrideListShell from 'components/StrideListShell';

import { makeSelectSelectors } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { updateSelectors, loadStrides } from './actions';
import checkParams from './checkParams';

const SearchWrapper = styled.div`
  position: relative;
  min-height: 100%;
`

const RefreshLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.80);
`

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)

    this.handleSelectorChange = this.handleSelectorChange.bind(this)
    this.handleStrideSelect = this.handleStrideSelect.bind(this)
  }

  state = {
    refresh: false,
    loading: true,
    showShell: true
  }

  componentWillMount () {
    this.props.validateQueryParams(this.props.selectors.toJS())

// setTimeout(() =>
//   this.setState({ loading: false, showShell: false })
// , 3000)
    this.props.request(loadStrides, this.props.selectors.toJS())

  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && (this.props.loading && !nextProps.loading)) {
      this.setState({ loading: false, refresh: false, showShell: false })
    }
  }

  // Store selectors + update queries params + fetch
  handleSelectorChange ({ name, id }) {
    let selectors = this.props.selectors.set(name, id)

    this.setState({
      refresh: true,
      loading: true
    })

setTimeout(() => {
  this.setState({ refresh: false, loading: false })
}, 2000)

    this.props.validateQueryParams(selectors.toJS())
  }

  handlePagination () {

  }

  handleStrideSelect (stride) {
    let route = this.props.desktop ? `/search` : `/foulee`
    let location = {
      pathname: `${route}/${stride.id}`
    }
    if (this.props.desktop)
      Object.assign(location, { search: this.props.location.search })

    this.props.history.push(location, { stride })
  }

  render() {
    let stride = {
      title: 'escapade de la 1/2 lune',
      dep: '78',
      date: 1506204000,
      id: 'db166c7be05789fba33149b8f916cd84ef35717f',
      type: 'nature',
      distances: [
        {
          descriptor: { d: '10', unit: 'km' },
          value: 10000
        },
        {
          descriptor: { d: '5', unit: 'km' },
          value: 5000
        }
      ]
    }

    let stride0 = Object.assign({}, stride, {
      title: 'semi-marathon de Boulogne-Billancourt Christian GR'
    })

    let stride1 = Object.assign({}, stride, {
      title: 'escapade de la 1/2 lune',
      id: 'unautreid',
    })

    let stride2 = Object.assign({}, stride, {
      title: 'escapade de la 1/2 lune escapade de la 1/2 lune',
      id: 'encoreunautreid',
    })

    let stride3 = Object.assign({}, stride, {
      title: 'escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune',
      id: 'encoreunefois',
    })

    let stride4 = Object.assign({}, stride, {
      title: 'escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune escapade de la 1/2 lune',
      id: 'enpivoila',
    })

    let strides = [ stride0, stride1, stride2, stride3 ,stride4 ]

    return (
      <SearchWrapper>
        <Helmet>
          <title>{`Recherche`}</title>
          <meta name={`description`} content={`Description of Search`} />
        </Helmet>

        <Selectors
          defaultSelectors={this.props.selectors.toJS()}
          onSelectorChange={this.handleSelectorChange}
          desktop={this.props.desktop}
        />

        {this.state.loading && this.state.refresh &&
          <RefreshLoader />
        }

        {this.state.loading && this.state.showShell ?
          <StrideListShell />
        :
          <StrideList
            strides={strides}
            onStrideSelect={this.handleStrideSelect}
            onPagination={this.handlePagination}
            loading={this.state.loading && !this.state.refresh}
          />
        }

      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  validateQueryParams: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  selectors: makeSelectSelectors()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateSelectors: (selectors) => dispatch(updateSelectors(selectors))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

const withCheckParams = checkParams({ key: 'search', action: updateSelectors });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withCheckParams
)(Search);
