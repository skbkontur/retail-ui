import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from 'react-codemirror';

import components from '../components';

import CodeRunner from './CodeRunner';
import PropsDoc from './PropsDoc';

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
