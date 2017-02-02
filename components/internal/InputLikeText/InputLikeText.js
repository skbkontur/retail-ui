// @flow

import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../../filterProps';
import Upgrades from '../../../lib/Upgrades';

import '../../ensureOldIEClassName';
import styles from './InputLikeText.less';

const PASS_PROPS = {
  onBlur: true,
  onClick: true,
  onFocus: true,
  onKeyDown: true,
  onKeyPress: true,
};

export default class InputLikeText extends React.Component {
  props: {
    borderless?: bool,
    children?: any,
    error?: bool,
    padRight?: bool,
    warning?: bool,
    disabled?: bool
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
      [styles.deprecated_oldSize]: !Upgrades.isHeight34Enabled(),
    });

    return (
      <span tabIndex="0" className={className} {...passProps}>
        {this.props.children}
      </span>
    );
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }
}
