/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import Media from 'react-media'
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { HEIGHT_APPBAR } from 'global-styles-variables';

import injectSaga from 'utils/injectSaga';

import AppHeader from 'components/AppHeader';
// import AppHomeLoader from 'components/AppHomeLoader';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Search from 'containers/Search';
import Stride from 'containers/Stride';
import SearchDesktop from 'containers/SearchDesktop';
import Admin from 'containers/Admin';

import saga from './saga';
import credentialProvider from './credentialProvider';

const AppWrapper = styled.div`
  min-height: 100%;
  height: 1px;
  padding-top: ${HEIGHT_APPBAR}px;
`

const AppHomeLoaderRoute = ({ component: Component, request, ...rest }) =>
  <Route {...rest} render={props => (
    // <AppHomeLoader>
      <Component request={request} {...props} />
    // </AppHomeLoader>
  )}/>

function App(props) {
  return (
    <AppWrapper>
      <Helmet defaultTitle={`La Foulée`} titleTemplate={`La Foulée - %s`}>
        <meta name={`description`} content={`Quelle est ta prochaine course ?`} />
      </Helmet>

      <AppHeader />

      <Media query={`(max-width: 768px)`}>
        {matches => matches ?
          <Switch>
            <Route exact path={`/`} component={() =>
              <Redirect to={`/search`} />
            }/>

            <AppHomeLoaderRoute exact path={'/search'} component={Search} request={props.request} />
            <Route path={'/search/:strideID'} component={({ match, location }) =>
              <Redirect to={`/foulee/${match.params.strideID}`} />
            }/>

            <AppHomeLoaderRoute path={'/foulee/:strideID'} component={Stride} request={props.request} />

            <Route component={NotFoundPage} />
          </Switch>
        :
          <Switch>
            <Route exact path={`/`} component={() =>
              <Redirect to={`/search`} />
            }/>

            <AppHomeLoaderRoute exact path={'/search'} component={SearchDesktop} request={props.request} />
            <AppHomeLoaderRoute path={'/search/:strideID'} component={SearchDesktop} request={props.request} />

            <Route path={'/foulee/:strideID'} component={({ match, location }) =>
              <Redirect to={`/search/${match.params.strideID}${location.search}`} />
            }/>

            <AppHomeLoaderRoute exact path={'/admin'} component={Admin} request={props.request} />
            <Route component={NotFoundPage} />
          </Switch>
        }
      </Media>

    </AppWrapper>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
  withRouter,
  credentialProvider
)(App)
