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

/*
 * APP DOMAIN
 */

 const selectApp = (state) => state.get('app');

 const makeSelectFeching = () => createSelector(
   selectApp,
   (appState) => appState.get('fetching')
 );

 const makeSelectMinLoadingTime = () => createSelector(
   selectApp,
   (appState) => appState.get('minLoadingTime')
 );

export {
  makeSelectLocation,
  makeSelectUserCredentials,
  makeSelectFeching,
  makeSelectMinLoadingTime
};
