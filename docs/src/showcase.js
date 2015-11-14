require('babel/polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect} from 'react-router';

import Component from './components/Component';
import Components from './components/Components';
import Demo from './components/Demo';
import GettingStarted from './components/GettingStarted';
import ShowcaseApp from './components/ShowcaseApp';

ReactDOM.render((
  <Router>
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
