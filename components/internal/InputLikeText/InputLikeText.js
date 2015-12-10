import React from 'react';
import ReactDOM from 'react-dom';

import styles from './InputLikeText.less';

export default class InputLikeText extends React.Component {
  render() {
    return (
      <span tabIndex="0" className={styles.root}>{this.props.children}</span>
    );
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }
}
