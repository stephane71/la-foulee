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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { List } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import HelmetIntl from 'components/HelmetIntl';
import Selectors from 'components/Selectors';
import StrideList from 'components/StrideList';
import StrideListShell from 'components/StrideListShell';

import {
  makeSelectFeching
} from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import checkParams from './checkParams';
import {
  updateSelectors,
  loadStrides,
  setCurrentPage
} from './actions';
import {
  makeSelectSelectors,
  makeSelectStrides,
  makeSelectNbStrides,
  makeSelectNbPages,
  makeSelectCurrentPage
} from './selectors';

const SearchWrapper = styled.div`
  position: relative;
  min-height: 100%;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.80);
  z-index: 20;
`

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
    showShell: true
  }

  componentWillMount () {
    // Selectors are empty = the app has been refresh || first visit in this page
    if (this.props.selectors.isEmpty()) {
      this.props.validateQueryParams(qs.parse(window.location.search))
    } else {
      this.setState({
        loading: false,
        showShell: false
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.selectors !== nextProps.selectors) {
      this.props.request(loadStrides, nextProps.selectors.toJS())
    }

    if ((this.props.currentPage !== nextProps.currentPage) && (this.props.selectors === nextProps.selectors)) {
      this.props.request(
        loadStrides,
        nextProps.selectors.set('page', nextProps.currentPage).toJS()
      )
    }

    if (this.state.loading && !nextProps.loading) {
      this.setState({
        loading: false,
        refresh: false,
        showShell: false
      })

      if (this.props.desktop && !this.props.match.params.strideID && nextProps.strides.size) {
        let stride = nextProps.strides.get(0).get(0)
        this.props.history.replace({
          pathname: `/search/${stride.id}`,
          search: this.props.location.search,
          stride: stride.toJS()
        })
      }
    }
  }

  isSameList (nextProps) {
    return this.props.strides.size && nextProps.strides.size &&
        // Same list detection
       (this.props.strides.get(0).get(0).date === nextProps.strides.get(0).get(0).date)
  }

  handleSelectorChange ({ name, id }) {
    this.setState({
      loading: true,
      refresh: true
    })

    let selectors = this.props.selectors.set(name, id)

    this.props.validateQueryParams(selectors.toJS())
    this.props.desktop ? this.props.scrollToTop() : window.scrollTo(0,0)
  }

  handlePagination () {
    if ((this.props.currentPage + 1) < this.props.pages) {
      this.setState({
        loading: true,
        refresh: false
      })
      this.props.setCurrentPage(this.props.currentPage + 1)
    }
  }

  handleStrideSelect (stride) {
    let route = this.props.desktop ? `/search` : `/foulee`
    let location = {
      pathname: `${route}/${stride.id}`
    }
    if (this.props.desktop)
      Object.assign(location, { search: this.props.location.search })

    this.props.history.push(location, { stride: stride.toJS() })
  }

  render() {
    return (
      <SearchWrapper>
        <HelmetIntl title={messages.headerTitle} content={messages.headerContent} />

        <Selectors
          defaultSelectors={this.props.selectors.toJS()}
          onSelectorChange={this.handleSelectorChange}
          desktop={this.props.desktop}
        />

        {this.state.loading && this.state.refresh &&
          <Overlay />
        }

        {this.state.loading && this.state.showShell ?
          <StrideListShell />
        :
          <StrideList
            strides={this.props.strides}
            onStrideSelect={this.handleStrideSelect}
            onPagination={this.handlePagination}
            end={this.props.currentPage + 1 === this.props.pages}
            desktop={this.props.desktop}
          />
        }

      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  validateQueryParams: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  scrollToTop: PropTypes.func,
  selectors: PropTypes.object.isRequired,
  strides: PropTypes.instanceOf(List).isRequired,
  nbStrides: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  selectors: makeSelectSelectors(),
  strides: makeSelectStrides(),
  nbStrides: makeSelectNbStrides(),
  pages: makeSelectNbPages(),
  currentPage: makeSelectCurrentPage(),
  loading: makeSelectFeching()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateSelectors: selectors => dispatch(updateSelectors(selectors)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage))
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
