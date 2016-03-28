import React from 'react';
import ReactDOM from 'react-dom';
import reactTools from 'react-tools';

import __components from '../components';

import styles from './CodeRunner.less';

function run(src, mountNode) {
  try {
    evalCode(src, mountNode);
  } catch (ex) {
    console.error(ex);

    ReactDOM.render(<div>{ex.toString()}</div>, mountNode);
  }
}

const __vars = {
  React,
  ReactDOM,
};
for (const component of __components) {
  __vars[component.name] = component.component;
}

function evalCode(_src, mountNode) {
  let code = '';
  for (const name in __vars) {
    if (__vars.hasOwnProperty(name)) {
      code += `var ${name} = __vars.${name};`;
    }
  }

  code += reactTools.transform(_src, {
    harmony: true,
  });

  eval(`(function(__vars) { ${code} })`)(__vars); // eslint-disable-line no-eval
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

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this));
  },
});

export default CodeRunner;
