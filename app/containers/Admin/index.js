/**
 *
 * Admin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { List } from 'immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MONTH_LIST, DATE_FORMAT } from 'utils/enums';
import { getSpacing } from 'global-styles-variables';

import StrideRead from './StrideRead';
import StrideEdition from './StrideEdition';


import makeSelectAdmin from './selectors';
import saga from './saga';
import reducer from './reducer';
import { loadStrides } from './actions';

const AdminWrapper = styled.div`
  padding: ${getSpacing(`m`)}px;
`

const RowStride = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: ${getSpacing(`s`)}px;
`
const CellButtonEditon = styled.div`
    padding: ${getSpacing(`m`)}px;
    border-right: 1px solid black;
`

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    strideEditing: null
  }

  componentDidMount () {
    // console.log(MONTH_LIST)
    console.log('loadStrides');
    this.props.request(loadStrides, { month: '10-2017' })
  }

  onToggleStrideEdit (rowID) {
    this.setState(({ strideEditing }) => ({ strideEditing: strideEditing === rowID ? null : rowID }))
  }

  render() {
    let strides = []
    return (
      <AdminWrapper>
        {`Admin`}
        <div>
          {this.props.admin.strides.map((strideList, i) =>
            <div key={i}>
              <div>{moment.unix(strideList[0].date).format(DATE_FORMAT)}</div>
              {strideList.map((stride, j) =>
                <RowStride key={j}>
                  <CellButtonEditon>
                    <button onClick={() => this.onToggleStrideEdit(stride.id)}>
                      {`Edit`}
                    </button>
                  </CellButtonEditon>
                  {this.state.strideEditing === stride.id ?
                    <StrideEdition stride={stride} />
                  :
                    <StrideRead stride={stride} />
                  }
                </RowStride>
              )}
            </div>
          )}
        </div>
      </AdminWrapper>
    );
  }
}

Admin.propTypes = {
  request: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admin: makeSelectAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'admin', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Admin);
