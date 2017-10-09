import { createSelector } from 'reselect';

/**
 * Direct selector to the search state domain
 */
const selectSearchDomain = (state) => state.get('search');

/**
 * Other specific selectors
 */

 const makeSelectSelectors = () => createSelector(
   selectSearchDomain,
   (substate) => substate.get('selectors')
 );

/**
 * Default selector used by Search
 */

const makeSelectSearch = () => createSelector(
  selectSearchDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearch;
export {
  selectSearchDomain,
  makeSelectSelectors
};
