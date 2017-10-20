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

const makeSelectStrides = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('strides')
);

const makeSelectNbStrides = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('nbStrides')
);

const makeSelectNbPages = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('pages')
);

const makeSelectCurrentPage = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('currentPage')
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
  makeSelectSelectors,
  makeSelectStrides,
  makeSelectNbStrides,
  makeSelectCurrentPage,
  makeSelectNbPages
};
