var React = require('react');

require('codemirror/lib/codemirror.css');
require('codemirror/theme/solarized.css');
require('codemirror/mode/javascript/javascript');
var CodeMirror = require('react-codemirror');

var components = require('../components');

var CodeRunner = require('./CodeRunner');
var PropsDoc = require('./PropsDoc');

import styles from './Component.less';

const editorOptions = {
  theme: 'solarized light',
  smartIndent: false, // Doesn't work for jsx.
  lineWrapping: true,
  lineNumbers: true,
  viewportMargin: Infinity,
};

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
          <CodeMirror value={this.state.src} onChange={this.handleCodeChange}
            options={editorOptions}
          />
          <PropsDoc component={component} />
        </div>
      </div>
    );
  },

  getInitialState() {
    return {
      src: this._getComponent().src,
    };
  },

  componentWillReceiveProps(newProps) {
    if (newProps.params.component !== this.props.params.component) {
      this.setState({
        src: this._getComponent(newProps.params.component).src,
      });
    }
  },

  handleCodeChange(src) {
    this.setState({src});
  },

  _getComponent(name = this.props.params.component) {
    return components.find((c) => c.name === name);
  },
});

module.exports = Component;
