/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/favicon.ico?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/apple-touch-icon.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/favicon-32x32.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/favicon-16x16.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/safari-pinned-tab.svg?v=yya2lgM4gb';

import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./manifest.json?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/android-chrome-192x192.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/android-chrome-512x512.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/mstile-70x70.png?v=yya2lgM4gb';
import '!file-loader?name=[name].[ext]?v=yya2lgM4gb!./images/favicons/mstile-144x144.png?v=yya2lgM4gb';

import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// AWS
import 'aws/aws-sdk'

// moment locals
import moment from 'moment';
moment.locale('fr')

// Import CSS reset and Global Styles
import './global-styles';
import 'fonts/circular-bold.css';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
