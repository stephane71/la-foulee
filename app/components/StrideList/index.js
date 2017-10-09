/**
*
* StrideList
*
*/

import React from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';

import StrideItem from 'components/StrideItem';

const WrapperStrideList = styled.div`

`

class StrideList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    loading: false,
    listEnd: false
  }

  componentWillReceiveProps (nextProps) {
    // !!!! length & size (Immutable) !!!!
    if (this.props.loading && !nextProps.loading) {
      this.setState({
        loading: false,
        listEnd: this.props.strides.length === nextProps.strides.length
      })
    }
  }

  onReachStrideListEnd () {
    this.setState({ loading: true })
    this.props.onPagination()
  }

  render() {
    return (
      <WrapperStrideList>
        {this.props.strides.map((stride, i) =>
          <StrideItem key={i} data={stride} onClick={stride => this.props.onStrideSelect(stride)} />
        )}
        <VisibilitySensor
          onChange={isVisible => isVisible && this.onReachStrideListEnd()}
        />
        {this.state.loading ?
          <span>{`Chargement des évennements...`}</span>
        : this.state.listEnd &&
          <span>{`Fin de la liste !`}</span>
        }
      </WrapperStrideList>
    );
  }
}

StrideList.propTypes = {

};

export default StrideList;
