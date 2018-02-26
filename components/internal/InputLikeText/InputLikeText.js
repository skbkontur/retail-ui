// @flow

import classNames from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import '../../ensureOldIEClassName';
import Upgrades from '../../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
  ? require('../../Input/Input.flat.less')
  : require('../../Input/Input.less');

type Props = {
  borderless?: boolean,
  children?: React.Node,
  error?: boolean,
  padRight?: boolean,
  warning?: boolean,
  disabled?: boolean,
  size: 'small' | 'medium' | 'large',
  width?: string | number,
  placeholder?: string,
  innerRef?: (el: HTMLElement | null) => void,
  // eslint-disable-next-line flowtype/no-weak-types
  [key: string]: any
};

export default class InputLikeText extends React.Component<Props> {
  _node: HTMLElement | null = null;

  static defaultProps = {
    size: 'small'
  };

  /**
   * @public
   */
  focus() {
    this._node && this._node.focus();
  }

  /**
   * @public
   */
  blur() {
    this._node && this._node.blur();
  }

  render() {
    const className = classNames({
      [styles.root]: true,
      [styles.padRight]: this.props.padRight,
      [styles.borderless]: this.props.borderless,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
      [styles.disabled]: this.props.disabled,
      [this._getSizeClassName()]: true
    });

    let placeholder = null;
    if (!this.props.children && this.props.placeholder) {
      placeholder = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    return (
      <label className={className} style={{ width: this.props.width }}>
        <span
          {...this.props}
          tabIndex={this.props.disabled ? -1 : 0}
          className={styles.input}
          ref={this._ref}
        >
          <span
            style={{
              position: 'absolute',
              left: 1,
              right: 1,
              paddingLeft: 'inherit',
              paddingRight: 'inherit',
              overflow: 'hidden'
            }}
          >
            {this.props.children}
          </span>
        </span>
        {placeholder}
      </label>
    );
  }

  _ref = el => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this._node = el;
  };

  _getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: styles.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? styles.sizeMedium
        : styles.DEPRECATED_sizeMedium,
      large: styles.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size];
  }
}
