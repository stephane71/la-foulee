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
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HEIGHT_APPBAR } from 'global-styles-variables';

import AppHeader from 'components/AppHeader';
import AppHomeLoader from 'components/AppHomeLoader';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Search from 'containers/Search';
import Stride from 'containers/Stride';
import SearchDesktop from 'containers/SearchDesktop';

const AppWrapper = styled.div`
  min-height: 100%;
  height: 1px;
  padding-top: ${HEIGHT_APPBAR}px;
`

const AppHomeLoaderRoute = ({ component: Component, ...rest }) =>
  <Route {...rest} render={props => (
    // <AppHomeLoader>
      <Component {...props} />
    // </AppHomeLoader>
  )}/>

export default function App() {
  return (
    <AppWrapper>
      <Helmet defaultTitle={`La Foulée`} titleTemplate="La Foulée | %s">
        <meta name={`description`} content={`Quelle est ta prochaine course ?`} />
      </Helmet>

      <AppHeader />

      <Media query={`(max-width: 768px)`}>
        {matches => matches ?
          <Switch>
            <Route exact path={`/`} component={() =>
              <Redirect to={`/search`} />
            }/>

            <AppHomeLoaderRoute exact path={'/search'} component={Search} />
            <Route path={'/search/:strideID'} component={({ match, location }) =>
              <Redirect to={`/foulee/${match.params.strideID}`} />
            }/>

            <AppHomeLoaderRoute path={'/foulee/:strideID'} component={Stride} />

            <Route component={NotFoundPage} />
          </Switch>
        :
          <Switch>
            <Route exact path={`/`} component={() =>
              <Redirect to={`/search`} />
            }/>

            <AppHomeLoaderRoute exact path={'/search'} component={SearchDesktop} />
            <AppHomeLoaderRoute path={'/search/:strideID'} component={SearchDesktop} />

            <Route path={'/foulee/:strideID'} component={({ match, location }) =>
              <Redirect to={`/search/${match.params.strideID}${location.search}`} />
            }/>
            <Route component={NotFoundPage} />
          </Switch>
        }
      </Media>

    </AppWrapper>
  );
}
