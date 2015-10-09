var React = require('react');

require('codemirror/lib/codemirror.css');
require('codemirror/theme/solarized.css');
require('codemirror/mode/javascript/javascript');
var CodeMirror = require('codemirror');

var components = require('../components');

var CodeRunner = require('./CodeRunner');
var PropsDoc = require('./PropsDoc');

import styles from './Component.less';

var Component = React.createClass({
  render() {
    var component = this._getComponent();
    return (
      <div className={styles.root}>
        <h2 className={styles.name}>{component.name}</h2>
        <div className={styles.demo}>
          <CodeRunner src={this.state.src} />
        </div>
        <div className={styles.docs}>
          <div ref={(node) => this._codeNode = node}></div>
          <PropsDoc component={component} />
        </div>
      </div>
    );
  },

  getInitialState() {
    return {
      src: this._getComponent().src || '',
    };
  },

  componentDidMount() {
    var editor = CodeMirror(this._codeNode, {
      value: this.state.src.replace(/\n$/, ''),
      theme: 'solarized light',
      smartIndent: false, // Doesn't work for jsx.
      lineWrapping: true,
      lineNumbers: true,
      viewportMargin: Infinity,
    });
    editor.on('change', (doc) => {
      this.setState({src: doc.getValue()});
    });
  },

  _getComponent() {
    return components.find((c) => c.name === this.props.params.component);
  },
});

module.exports = Component;
