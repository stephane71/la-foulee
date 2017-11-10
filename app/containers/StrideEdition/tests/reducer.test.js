
import { fromJS } from 'immutable';
import strideEditionReducer from '../reducer';

describe('strideEditionReducer', () => {
  it('returns the initial state', () => {
    expect(strideEditionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
