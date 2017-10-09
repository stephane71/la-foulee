/**
*
* Selectors
*
*/

import React from 'react';
import styled from 'styled-components';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { getColor, white } from 'colors';

import { MONTHS, DEPARTEMENTS, SELECTORS } from 'utils/enums';
import ArrowDropDown from 'images/background-images/ic_arrow_drop_down_black_24px.svg';

let borderColor = getColor(`extraLight`)

const SelectorsWrapper = styled.div`
  position: sticky;
  top: ${({ top }) => top}px;
  display: flex;
  border-bottom: 1px solid ${borderColor};
  background-color: ${white};
`

const SelectWrapper = styled.div`
  position: relative;
  border-right: ${props => props.borderRight ? `1px solid ${borderColor}` : ``};
  width: 50%;
`

let PADDING_RIGHT_SELECT = 35
const Select = styled.select`
  appearance: none;
  outline: 0;
  padding: ${getSpacing('s')}px;
  padding-right: ${PADDING_RIGHT_SELECT}px;
  text-decoration: none;
  width: 100%;
  background-image: url(${ArrowDropDown});
  background-position: calc(100% - ${getSpacing('s')}px) center;
`

class Selectors extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)

    this.handleSelectorChange = this.handleSelectorChange.bind(this)
    let [ month, dep ] = SELECTORS
    this.state = {
      [month]: this.props.defaultSelectors[month],
      [dep]: this.props.defaultSelectors[dep]
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultSelectors !== nextProps.defaultSelectors)
      this.setState(nextProps.defaultSelectors)
  }

  handleSelectorChange (event) {
    event.preventDefault()
    let { name, value } = event.target

    this.setState({ [name]: value })
    this.props.onSelectorChange({ name, id: value })
  }

  render () {
    let [ month, dep ] = SELECTORS
    let selectors = [
      { name: month, values: MONTHS, borderRight: true },
      { name: dep, values: DEPARTEMENTS }
    ]

    return (
      <SelectorsWrapper top={this.props.desktop ? 0 : HEIGHT_APPBAR}>
        {selectors.map(({ name, values, borderRight }, i) =>
          <SelectWrapper key={i} borderRight={borderRight}>
            <Select
              name={name}
              onChange={this.handleSelectorChange}
              value={this.state[name]}
            >
              <option key={''} value={''}>{'Tous les départements'}</option>
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

};

export default Selectors;
