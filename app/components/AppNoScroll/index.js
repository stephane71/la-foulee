/**
*
* AppNoScroll
*
*/

import React from 'react';

class AppNoScroll extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount () {
    document.getElementById(`app`).classList.add('no-scroll')
  }

  componentWillUnmount () {
    document.getElementById(`app`).classList.remove('no-scroll')
  }

  render() {
    return null
  }
}

AppNoScroll.propTypes = {

};

export default AppNoScroll;
