var React = require('react');

var ShowcaseApp = require('./components/ShowcaseApp');

var items = [
  {
    name: 'Button',
    component: require('ui/Button'),
    src: require('!raw!./snippets/Button.jsx'),
  },
  {
    name: 'Checkbox',
    component: require('ui/Checkbox'),
    src: require('!raw!./snippets/Checkbox.jsx'),
  },
  {
    name: 'Input',
    component: require('ui/Input'),
    src: require('!raw!./snippets/Input.jsx'),
  },
  {
    name: 'SearchBox',
    component: require('ui/SearchBox'),
    src: require('!raw!./snippets/SearchBox.jsx'),
  }
];

React.render(
  <ShowcaseApp items={items} />,
  document.getElementById('showcase')
);
