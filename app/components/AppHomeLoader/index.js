/**
*
* AppHomeLoader
*
*/

import React from 'react';
import styled from 'styled-components';

import { dominant } from 'colors';

import LaFouleeSVG from 'components/LaFouleeSVG';

const AppHomeLoaderWrapper = styled.div`
  height: 100%;
`

const AppLoader = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${dominant};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ChildrenBlock = styled.div`
  height: 100%;
  display: ${props => props.display ? `block` : `none`};
`

export class AppHomeLoader extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)
    this.state = {
      displayChildren: false
    }
    setTimeout(() => this.setState({ displayChildren: true }), 1000)
  }

  render () {
    return (
      <AppHomeLoaderWrapper>
        {!this.state.displayChildren &&
          <AppLoader>
            <LaFouleeSVG theme={'tonic'} />
          </AppLoader>
        }
        <ChildrenBlock display={this.state.displayChildren}>
          {this.props.children}
        </ChildrenBlock>
      </AppHomeLoaderWrapper>
    );
  }
}

AppHomeLoader.propTypes = {

};

export default AppHomeLoader;
