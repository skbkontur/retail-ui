import 'babel-polyfill';
import './regeneratorRuntime';
import '../../testing';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import ComponentInfo from './components/ComponentInfo';
import ComponentsPage from './components/ComponentsPage';
import DemoPage from './components/DemoPage';
import GettingStartedPage from './components/GettingStartedPage';
import DocsApp from './components/DocsApp';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={DocsApp}>
      <IndexRedirect to="/components" />
      <Route path="gettingStarted" component={GettingStartedPage} />
      <Route path="components" component={ComponentsPage}>
        <Route path=":component" component={ComponentInfo} />
      </Route>
      <Route path="demo" component={DemoPage} />
    </Route>
  </Router>
), document.getElementById('react-root'));
