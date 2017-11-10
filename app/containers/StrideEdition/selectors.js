import { createSelector } from 'reselect';

/**
 * Direct selector to the strideEdition state domain
 */
const selectStrideEditionDomain = (state) => state.get('strideEdition');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StrideEdition
 */

const makeSelectStrideEdition = () => createSelector(
  selectStrideEditionDomain,
  (substate) => substate.toJS()
);

export default makeSelectStrideEdition;
export {
  selectStrideEditionDomain,
};
