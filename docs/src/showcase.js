import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import Upgrades from '../../lib/Upgrades';

import Component from './components/Component';
import Components from './components/Components';
import Demo from './components/Demo';
import GettingStarted from './components/GettingStarted';
import ShowcaseApp from './components/ShowcaseApp';

Upgrades.enableHeight34();

const history = useRouterHistory(createHashHistory)({queryKey: false});

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={ShowcaseApp}>
      <IndexRedirect to="/components" />
      <Route path="gettingStarted" component={GettingStarted} />
      <Route path="components" component={Components}>
        <Route path=":component" component={Component} />
      </Route>
      <Route path="demo" component={Demo} />
    </Route>
  </Router>
), document.getElementById('showcase'));
