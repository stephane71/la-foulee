/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { List } from 'immutable';
import { HEIGHT_APPBAR } from 'global-styles-variables';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SelectorRecord from 'records/SelectorRecord'

import HelmetIntl from 'components/HelmetIntl';
import Selectors from 'components/Selectors';
import StrideList from 'components/StrideList';
import StrideListShell from 'components/StrideListShell';
import Loader from 'components/Loader';
import AppNoScroll from 'components/AppNoScroll';

import { makeSelectFeching } from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import checkParams from './checkParams';
import {
  updateSelectors,
  loadStrides
} from './actions';
import {
  makeSelectSelectors,
  makeSelectStrides,
  makeSelectNbStrides,
  makeSelectCurrentPage
} from './selectors';

const SearchWrapper = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vh - ${HEIGHT_APPBAR}px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.80);
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
`

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)

    this.handleSelectorChange = this.handleSelectorChange.bind(this)
    this.handleStrideSelect = this.handleStrideSelect.bind(this)
  }

  state = {
    refresh: false,
    showShell: true
  }

  componentWillMount () {
    // Selectors are empty = the app has been refresh || first visit in this page
    if (this.props.selectors.isEmpty()) {
      let selectors = this.props.replaceCurrentLocationSearch()
      // In the case that the url is ok, there is no history.replace
      // So selectors has to be set to trigger the api request
      // But when the url has been change (replace) updateSelectors will be triggered too
      //  when the location change is detected
      this.props.updateSelectors(selectors)
    } else {
      this.setState({
        showShell: false
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location !== nextProps.location) {
      let selectors = this.props.getValidParams()
      // Danger on Desktop: location change because of a Foulee select not qs
      if (!this.props.selectors.equals(new SelectorRecord(selectors)))
        this.props.updateSelectors(selectors)
    }

    if (this.props.selectors !== nextProps.selectors) {
      this.setState({
        refresh: true
      })
      this.props.request(loadStrides, nextProps.selectors.toJS())
    }

    if ((this.props.currentPage !== nextProps.currentPage) && nextProps.currentPage > 0) {
      this.setState({
        refresh: false
      })
      this.props.request(
        loadStrides,
        Object.assign(nextProps.selectors.toJS(), { page: nextProps.currentPage })
      )
    }

    if (this.props.loading && !nextProps.loading) {
      this.setState({
        refresh: false,
        showShell: false
      })

      if (this.props.desktop)
        this.props.isUpdating(false)

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

  handleSelectorChange ({ name, id }) {
    let selectors = this.props.selectors.set(name, id)
    this.props.pushLocationSearch(selectors.toJS())

    this.props.desktop ? this.props.isUpdating(true) : window.scrollTo(0,0)
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
          defaultSelectors={this.props.selectors}
          onSelectorChange={this.handleSelectorChange}
          desktop={this.props.desktop}
        />

        {this.state.refresh &&
          <Overlay>
            <AppNoScroll />
            <Loader />
          </Overlay>
        }

        {this.state.showShell ?
          <StrideListShell />
        :
          <StrideList
            onStrideSelect={this.handleStrideSelect}
            lock={this.state.refresh}
            desktop={this.props.desktop}
          />
        }

      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  pushLocationSearch: PropTypes.func.isRequired,
  replaceCurrentLocationSearch: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  isUpdating: PropTypes.func,
  selectors: PropTypes.instanceOf(SelectorRecord).isRequired,
  strides: PropTypes.instanceOf(List).isRequired,
  nbStrides: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  selectors: makeSelectSelectors(),
  strides: makeSelectStrides(),
  nbStrides: makeSelectNbStrides(),
  currentPage: makeSelectCurrentPage(),
  loading: makeSelectFeching()
});

function mapDispatchToProps(dispatch) {
  return {
    updateSelectors: selectors => dispatch(updateSelectors(selectors))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

const withCheckParams = checkParams({ key: 'search' });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withCheckParams
)(Search);
