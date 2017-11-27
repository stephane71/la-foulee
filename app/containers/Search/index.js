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
import { CURRENT_MONTH } from 'utils/enums'

import HelmetIntl from 'components/HelmetIntl';
import Selectors from 'components/Selectors';
import StrideList from 'components/StrideList';
import StrideListShell from 'components/StrideListShell';
import OverlayLoader from 'components/OverlayLoader';
import { makeSelectFeching } from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
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

  componentDidMount () {
    this.props.updateSelectors(new SelectorRecord({
      month: CURRENT_MONTH
    }))
  }

  componentWillReceiveProps (nextProps) {
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
        Object.assign(nextProps.selectors.toJS(), { page: nextProps.currentPage }))
    }

    if (this.props.loading && !nextProps.loading) {
      this.setState({
        refresh: false,
        showShell: false
      })

      if (this.props.desktop)
        this.props.isUpdating(false)

      // What if it's an empty list ? :( => select all dep by default: should not be empty
      if (this.props.desktop && !this.props.match.params.strideKeyword && nextProps.strides.size) {
        let stride = nextProps.strides.get(0).get(0)
        let location = {
          pathname: `/event/${stride.keyword}`
        }

        this.props.history.replace(location, { stride: stride.toJS() })
      }
    }
  }

  handleSelectorChange ({ name, id }) {
    let selectors = this.props.selectors.set(name, id)
    this.props.updateSelectors(selectors)

    this.props.desktop ? this.props.isUpdating(true) : window.scrollTo(0,0)
  }

  handleStrideSelect (stride) {
    let location = {
      pathname: `/event/${stride.keyword}`
    }

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

        {this.state.refresh && <OverlayLoader />}

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

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Search);
