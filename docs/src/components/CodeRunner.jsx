var React = require('react');
var ReactDOM = require('react-dom');
var reactTools = require('react-tools');

var __components = require('../components');

import styles from './CodeRunner.less';

var __header = __components.map((component, i) => {
  return `var ${component.name} = __components[${i}].component;`;
}).join('\n') + '\n';

function run(src, mountNode) {
  try {
    evalCode(__header + src, mountNode);
  } catch (ex) {
    const error = ex.toString();
    if ('textContent' in mountNode) {
      mountNode.textContent = error;
    } else {
      mountNode.innerText = error;
    }
  }
}

function evalCode(_src, mountNode) {
  eval(reactTools.transform(_src, { // eslint-disable-line no-eval
    harmony: true,
  }));
}

var CodeRunner = React.createClass({
  render() {
    return <div className={styles.root} />;
  },

  componentDidMount() {
    run(this.props.src, ReactDOM.findDOMNode(this));
  },

  componentWillReceiveProps(props) {
    run(props.src, ReactDOM.findDOMNode(this));
  },
});

module.exports = CodeRunner;
