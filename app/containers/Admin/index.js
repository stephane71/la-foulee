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
import { reducer as formReducer } from 'redux-form/immutable';

import { getSpacing, HEIGHT_APPBAR } from 'global-styles-variables';
import { white } from 'colors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DATE_FORMAT } from 'utils/enums';

import StrideRead from './StrideRead';
import StrideEdition from './StrideEdition';

import makeSelectAdmin from './selectors';
import saga from './saga';
import reducer from './reducer';
import { loadStrides, patchStride } from './actions';

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
    this.props.request(loadStrides, { month: '10-2017' })
  }

  onToggleStrideEdit (stride) {
    this.setState({ strideEditing: stride })
  }

  cancelEdition () {
    this.setState({ strideEditing: null })
  }

  patchStride (data) {
    this.props.request(patchStride, data)
  }

  render() {
    let strides = []
    return (
      <AdminWrapper>
        {this.props.admin.strides.map((strideList, i) =>
          <div key={i}>
            <div>{moment.unix(strideList[0].date).format(DATE_FORMAT)}</div>
            {strideList.map((stride, j) =>
              <RowStride key={j}>
                <CellButtonEditon>
                  <button onClick={() => this.onToggleStrideEdit(stride)}>
                    {`Edit`}
                  </button>
                </CellButtonEditon>
                <StrideRead stride={stride} />
              </RowStride>
            )}
          </div>
        )}

        {this.state.strideEditing &&
          <StrideEdition
            stride={this.state.strideEditing}
            onCancel={() => this.cancelEdition()}
            onPatchStride={data => this.patchStride(data)}
          />
        }
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
const withReducerReduxForm = injectReducer({ key: 'form', reducer: formReducer });

const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withReducerReduxForm,
  withSaga,
  withConnect
)(Admin);
