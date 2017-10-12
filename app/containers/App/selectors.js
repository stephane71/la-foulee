import { createSelector } from 'reselect';


/*
 * ROUTE DOMAIN
 */

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

/*
 * USER DOMAIN
 */

const selectUser = (state) => state.get('user');

const makeSelectUserCredentials = () => createSelector(
  selectUser,
  (userState) => userState.get('credentials')
);

export {
  makeSelectLocation,
  makeSelectUserCredentials
};
