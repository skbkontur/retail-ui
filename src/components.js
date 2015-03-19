module.exports = [
  {
    name: 'Button',
    component: require('ui/Button'),
    source: require('!raw!ui/Button/Button.jsx'),
    src: require('!raw!./snippets/Button.jsx'),
  },
  {
    name: 'Checkbox',
    component: require('ui/Checkbox'),
    source: require('!raw!ui/Checkbox/Checkbox.jsx'),
    src: require('!raw!./snippets/Checkbox.jsx'),
  },
  {
    name: 'Input',
    component: require('ui/Input'),
    source: require('!raw!ui/Input/Input.jsx'),
    src: require('!raw!./snippets/Input.jsx'),
  },
  {
    name: 'SearchBox',
    component: require('ui/SearchBox'),
    source: require('!raw!ui/SearchBox/SearchBox.jsx'),
    src: require('!raw!./snippets/SearchBox.jsx'),
  }
];
