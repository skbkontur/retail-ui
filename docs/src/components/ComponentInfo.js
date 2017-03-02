import React from 'react';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/panda-syntax.css';
import 'codemirror/mode/jsx/jsx';

import components from '../components';

import CodeRunner from './CodeRunner';
import PropsDoc from './PropsDoc';

import styles from './ComponentInfo.less';

const editorOptions = {
  // theme: 'panda-syntax',
  lineWrapping: true,
  lineNumbers: true,
  mode: 'jsx',
  viewportMargin: Infinity
};

var Component = React.createClass({
  getInitialState() {
    return {
      showCode: false,
      src: this._getComponent().src
    };
  },

  render() {
    var component = this._getComponent();
    return (
      <div className={styles.root}>
        <h2 className={styles.name}>{component.name}</h2>
        <div className={styles.codeRunner}>
          <CodeRunner src={this.state.src} />
        </div>

        <div className={styles.code}>
          <div className={styles.codeTitle} onClick={this._triggerCode}>
            Source code
          </div>
          {this.state.showCode &&
            <CodeMirror
              value={this.state.src}
              onChange={this.handleCodeChange}
              options={editorOptions}
            />}
        </div>

        <div className={styles.docs}>
          <PropsDoc component={component} />
        </div>
      </div>
    );
  },

  componentWillReceiveProps(newProps) {
    if (newProps.params.component !== this.props.params.component) {
      this.setState({
        src: this._getComponent(newProps.params.component).src
      });
    }
  },

  handleCodeChange(src) {
    this.setState({ src });
  },

  _triggerCode() {
    this.setState({
      showCode: !this.state.showCode
    });
  },

  _getComponent(name = this.props.params.component) {
    return components.find(c => c.name === name);
  }
});

export default Component;
