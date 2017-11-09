/**
 *
 * SearchDesktop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { listBorderColor } from 'colors';
import { HEIGHT_APPBAR, getSpacing } from 'global-styles-variables';

import AppNoScroll from 'components/AppNoScroll';

import Search from 'containers/Search'
import Stride from 'containers/Stride'
import StrideEdition from 'containers/Admin/StrideEdition'

const SearchDesktopWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  height: 100vh;
`

const ScrollBase = styled.div`
  overflow-y: auto;
  position: absolute;
  top: ${HEIGHT_APPBAR}px;
  left: 0;
  right: 0;
  bottom: 0;
`

let sideBlockWidth = 35

const SearchSide = styled(ScrollBase)`
  width: ${sideBlockWidth}%;
  border-right: 1px solid ${listBorderColor};
`

const StrideSelected = styled(ScrollBase)`
  width: ${100 - sideBlockWidth}%;
  left: ${sideBlockWidth}%;
`

const EditButton = styled.button`
  position: fixed;
  top: ${HEIGHT_APPBAR + getSpacing(`s`)}px;
  right: ${getSpacing(`s`)}px;
`

export class SearchDesktop extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    edit: false
  }

  onSearchUpdating (started) {
    if (started) {
      this.searchSide.scrollTo(0,0)
      this.searchSide.classList.add('no-scroll')
    } else {
      this.searchSide.classList.remove('no-scroll')
    }
  }

  onToggleEdit () {
    this.setState(({ edit }) => ({ edit: !edit}))
  }

  render() {
    return (
      <SearchDesktopWrapper>

        <AppNoScroll />

        <SearchSide innerRef={searchSide => { this.searchSide = searchSide }}>
          <Search {...this.props} desktop isUpdating={(started) => this.onSearchUpdating(started)} />
        </SearchSide>
        <StrideSelected>
          {this.state.edit ?
            <StrideEdition {...this.props} stride={this.props.location.state.stride} />
          :
            <Stride {...this.props} desktop />
          }
          <EditButton onClick={() => this.onToggleEdit()}>{this.state.edit ? `Mode Lecture` : `Mode Edition`}</EditButton>
        </StrideSelected>

      </SearchDesktopWrapper>
    );
  }
}

SearchDesktop.propTypes = {

};

export default SearchDesktop
