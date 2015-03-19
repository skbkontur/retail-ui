module.exports = [
  {
    name: 'Button',
    component: require('ui/Button'),
    info: require('!docgen!ui/Button/Button.jsx'),
    src: require('!raw!./snippets/Button.jsx'),
  },
  {
    name: 'Checkbox',
    component: require('ui/Checkbox'),
    info: require('!docgen!ui/Checkbox/Checkbox.jsx'),
    src: require('!raw!./snippets/Checkbox.jsx'),
  },
  {
    name: 'Input',
    component: require('ui/Input'),
    info: require('!docgen!ui/Input/Input.jsx'),
    src: require('!raw!./snippets/Input.jsx'),
  },
  {
    name: 'SearchBox',
    component: require('ui/SearchBox'),
    info: require('!docgen!ui/SearchBox/SearchBox.jsx'),
    src: require('!raw!./snippets/SearchBox.jsx'),
  }
];
