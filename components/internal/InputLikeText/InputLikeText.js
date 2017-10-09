// @flow

import classNames from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../../filterProps';

import '../../ensureOldIEClassName';
import styles from './InputLikeText.less';

const PASS_PROPS = {
  onBlur: true,
  onClick: true,
  onFocus: true,
  onKeyDown: true,
  onKeyPress: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

export default class InputLikeText extends React.Component<{
  borderless?: boolean,
  children?: React.Node,
  error?: boolean,
  padRight?: boolean,
  warning?: boolean,
  disabled?: boolean,
  size: 'small' | 'medium' | 'large'
}> {
  static defaultProps = {
    size: 'small'
  };

  render() {
    const passProps = this.props.disabled
      ? {}
      : filterProps(this.props, PASS_PROPS);

    const className = classNames({
      [styles.root]: true,
      [styles.padRight]: this.props.padRight,
      [styles.borderless]: this.props.borderless,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
      [styles.disabled]: this.props.disabled,
      [styles[`size-${this.props.size}`]]: this.props.size
    });

    return (
      <span tabIndex="0" className={className} {...passProps}>
        <span className={styles.inner}>{this.props.children}</span>
      </span>
    );
  }

  focus() {
    // eslint-disable-next-line flowtype/no-weak-types
    (ReactDOM.findDOMNode(this): any).focus();
  }
}
