import { createSelector } from 'reselect';

/**
 * Direct selector to the stride state domain
 */
const selectStrideDomain = (state) => state.get('stride');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Stride
 */

const makeSelectStride = () => createSelector(
  selectStrideDomain,
  (state) => state.get('data')
);

export default makeSelectStride;
export {
  selectStrideDomain,
};
