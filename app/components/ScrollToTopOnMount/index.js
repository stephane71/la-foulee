/**
*
* ScrollToTopOnMount
*
*/

import React from 'react';
// import styled from 'styled-components';


class ScrollToTopOnMount extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return null
  }
}

export default ScrollToTopOnMount;
