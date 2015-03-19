var React = require('react');

var components = require('./components.js');

var ShowcaseApp = require('./components/ShowcaseApp');

React.render(
  <ShowcaseApp components={components} />,
  document.getElementById('showcase')
);
