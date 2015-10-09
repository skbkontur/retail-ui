require('babel/polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, Redirect} = require('react-router');

var Component = require('./components/Component');
var Components = require('./components/Components');
var Demo = require('./components/Demo');
var GettingStarted = require('./components/GettingStarted');
var ShowcaseApp = require('./components/ShowcaseApp');

React.render((
  <Router>
    <Route path="/" component={ShowcaseApp}>
      <Redirect from="/" to="/components" />
      <Route path="gettingStarted" component={GettingStarted} />
      <Route path="components" component={Components}>
        <Route path=":component" component={Component} />
      </Route>
      <Route path="demo" component={Demo} />
    </Route>
  </Router>
), document.getElementById('showcase'));
