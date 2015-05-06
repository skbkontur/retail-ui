require('babel/polyfill');

var React = require('react');
var Router = require('react-router');

var ComponentList = require('./components/ComponentList');
var Demo = require('./components/Demo');
var ShowcaseApp = require('./components/ShowcaseApp');

var routes = (
  <Router.Route name="app" path="/" handler={ShowcaseApp}>
    <Router.DefaultRoute name="components" handler={ComponentList} />
    <Router.Route name="demo" handler={Demo} />
  </Router.Route>
);

var holder = document.getElementById('showcase');
Router.run(routes, Handler => {
  React.render(<Handler />, holder);
});
