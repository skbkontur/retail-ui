// @flow

import classNames from 'classnames';
import * as React from 'react';

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

type State = {
  blinking: boolean
};

export default class InputLikeText extends React.Component<Props, State> {
  _node: HTMLElement | null = null;
  _blinkTimeout;

  static defaultProps = {
    size: 'small'
  };

  state = {
    blinking: false
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

  /**
   * @public
   */
  blink() {
    this.setState({ blinking: true }, () => {
      this._blinkTimeout = setTimeout(
        () => this.setState({ blinking: false }),
        150
      );
    });
  }

  componentWillUnmount() {
    if (this._blinkTimeout) {
      clearTimeout(this._blinkTimeout);
    }
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      tabIndex,
      className: cn,
      width,
      children,
      innerRef,
      placeholder: ph,
      error,
      warning,
      borderless,
      padRight,
      /* eslint-enable no-unused-vars */
      ...rest
    } = this.props;

    const className = classNames({
      [styles.root]: true,
      [styles.padRight]: padRight,
      [styles.borderless]: borderless,
      [styles.error]: error,
      [styles.warning]: warning,
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
          {...rest}
          tabIndex={this.props.disabled ? -1 : 0}
          className={classNames({
            [styles.input]: true,
            [styles.blink]: this.state.blinking
          })}
          ref={this._ref}
        >
          <span
            style={{
              position: 'absolute',
              left: 1,
              right: 1,
              paddingLeft: 'inherit',
              paddingRight: 'inherit',
              minHeight: 20 / 14 + 'em'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '100%',
                overflow: 'hidden'
              }}
            >
              {this.props.children}
            </span>
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
