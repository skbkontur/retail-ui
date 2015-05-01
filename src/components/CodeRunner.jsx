var React = require('react');
var reactTools = require('react-tools');

var __components = require('../components');

var __header = __components.map((component, i) => {
  return `var ${component.name} = __components[${i}].component;`;
}).join('\n') + '\n';

function run(src, mountNode) {
  try {
    evalCode(__header + src, mountNode);
  } catch (ex) {
    let error = ex.toString();
    if ('textContent' in mountNode) {
      mountNode.textContent = error;
    } else {
      mountNode.innerText = error;
    }
  }
}

function evalCode(_src, mountNode) {
  eval(reactTools.transform(_src, {
    harmony: true
  }));
}

var CodeRunner = React.createClass({
  render() {
    return <div />;
  },

  componentDidMount() {
    run(this.props.src, this.getDOMNode());
  },

  componentWillReceiveProps(props) {
    run(props.src, this.getDOMNode());
  }
});

module.exports = CodeRunner;
