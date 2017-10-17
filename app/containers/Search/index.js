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
import { List } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MONTHS, DEPARTEMENTS } from 'utils/enums';

import Selectors from 'components/Selectors';
import StrideList from 'components/StrideList';
import StrideListShell from 'components/StrideListShell';
import { getColor } from 'colors';

import {
  makeSelectFeching,
  makeSelectMinLoadingTime
} from 'containers/App/selectors';

import {
  makeSelectSelectors,
  makeSelectStrides,
  makeSelectNbStrides,
  makeSelectNbPages
} from './selectors';
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
  z-index: 20;
`
const MIN_LOADING_TIME = 1000

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)

    this.handleSelectorChange = this.handleSelectorChange.bind(this)
    this.handleStrideSelect = this.handleStrideSelect.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
  }

  state = {
    refresh: false,
    loading: true,
    showShell: true,
    currentPage: 0
  }

  componentWillMount () {
    this.props.validateQueryParams(this.props.selectors.toJS())
    this.props.request(loadStrides, this.props.selectors.toJS())
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && !nextProps.loading && !nextProps.minLoadingTime) {
      this.setState({
        loading: false,
        refresh: false,
        showShell: false
      })
    }

    if (this.isSameList(nextProps) && (this.props.nbStrides < nextProps.nbStrides)) {
         this.setState(({ currentPage }) => ({
           currentPage : currentPage + 1
         }))
    }
  }

  isSameList (nextProps) {
    return this.props.strides.size && nextProps.strides.size &&
        // Same list detection
       (this.props.strides.get(0).get(0).date === nextProps.strides.get(0).get(0).date)
  }

  handleSelectorChange ({ name, id }) {
    this.setState({
      refresh: true,
      loading: true,
      currentPage: 0
    })

    let selectors = this.props.selectors.set(name, id)

    this.props.validateQueryParams(selectors.toJS())
    this.props.request(loadStrides, this.props.selectors.toJS())

    window.scrollTo(0,0)
  }

  handlePagination () {
    if ((this.state.currentPage + 1) < this.props.pages) {
      this.setState({
        loading: true,
        refresh: false
      })

      this.props.request(
        loadStrides,
        Object.assign({}, this.props.selectors.toJS(), { page: this.state.currentPage + 1 })
      )
    }
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
            strides={this.props.strides}
            onStrideSelect={this.handleStrideSelect}
            onPagination={this.handlePagination}
            end={this.state.currentPage + 1 === this.props.pages}
          />
        }

      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  validateQueryParams: PropTypes.func.isRequired,
  selectors: PropTypes.object.isRequired,
  strides: PropTypes.instanceOf(List).isRequired,
  nbStrides: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  minLoadingTime: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  selectors: makeSelectSelectors(),
  strides: makeSelectStrides(),
  nbStrides: makeSelectNbStrides(),
  pages: makeSelectNbPages(),
  loading: makeSelectFeching(),
  minLoadingTime: makeSelectMinLoadingTime()
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
