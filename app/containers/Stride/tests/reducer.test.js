
import { fromJS } from 'immutable';
import strideReducer from '../reducer';

describe('strideReducer', () => {
  it('returns the initial state', () => {
    expect(strideReducer(undefined, {})).toEqual(fromJS({}));
  });
});
