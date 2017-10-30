/**
*
* Selectors
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { getColor, black } from 'colors';

import { MONTH_LIST, DEPARTEMENTS, SELECTORS } from 'utils/enums'
import SelectorRecord from 'records/SelectorRecord'
import ArrowDropDown from 'images/background-images/ic_arrow_drop_down_24px.svg'

const getSelectBackgroundPosition = ({ borderRight }) =>
  borderRight ? `calc(100% - ${getSpacing('s')}px)` : `calc(100% - ${getSpacing('m')}px)`

const SelectorsWrapper = styled.div`
  position: sticky;
  top: ${({ top }) => top}px;
  z-index: 10;
  display: flex;
  background-color: ${black};
  color: ${getColor('darkGrey', 'tonic')};
`

const SelectWrapper = styled.div`
  position: relative;
  border-right: ${props => props.borderRight ? `1px solid ${getColor('darkGrey', 'tonic')}` : ``};
  width: 50%;
`

const Select = styled.select`
  appearance: none;
  outline: 0;
  padding: ${getSpacing('s')}px;
  padding-left: ${({ borderRight }) => borderRight ? getSpacing('m') : getSpacing('s')}px;
  padding-right: ${2 * getSpacing('m')}px;
  text-decoration: none;
  width: 100%;
  background-image: url(${ArrowDropDown});
  background-position: ${getSelectBackgroundPosition};
`

class Selectors extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)

    this.handleSelectorChange = this.handleSelectorChange.bind(this)
    this.state = {
      selectors: this.props.defaultSelectors
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.defaultSelectors.equals(this.state.selectors)) {
      this.setState({
        selectors: nextProps.defaultSelectors
      })
    }
  }

  handleSelectorChange (event) {
    event.preventDefault()
    let { name, value } = event.target

    this.setState({
      selectors: this.state.selectors.set(name, value)
    })
    this.props.onSelectorChange({ name, id: value })
  }

  render () {
    let [ month, dep ] = SELECTORS
    let selectors = [
      { name: month, values: MONTH_LIST, borderRight: true },
      { name: dep, values: DEPARTEMENTS }
    ]

    return (
      <SelectorsWrapper top={this.props.desktop ? 0 : HEIGHT_APPBAR}>
        {selectors.map(({ name, values, borderRight }, i) =>
          <SelectWrapper key={i} borderRight={borderRight}>
            <Select
              name={name}
              onChange={this.handleSelectorChange}
              value={this.state.selectors.get(name)}
              borderRight={borderRight}
            >
              {!borderRight &&
                <option key={''} value={''}>
                  {'Tous les départements'}
                </option>
              }
              {values.map(({ id, value }, j) =>
                <option key={j} value={id}>{value}</option>
              )}
            </Select>
          </SelectWrapper>
        )}
      </SelectorsWrapper>
    );
  }
}

Selectors.propTypes = {
  onSelectorChange: PropTypes.func.isRequired,
  defaultSelectors: PropTypes.instanceOf(SelectorRecord).isRequired,
  desktop: PropTypes.bool
};

// HEIGHT = 2 * spacing 's' + base line height
export const HEIGHT_SELECTORS = 48;

export default Selectors;
