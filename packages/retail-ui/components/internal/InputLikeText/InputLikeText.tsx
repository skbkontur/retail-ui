import classNames from 'classnames';
import * as React from 'react';

import '../../ensureOldIEClassName';
import Upgrades from '../../../lib/Upgrades';
import { InputSize } from '../../Input';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
  ? require('../../Input/Input.flat.less')
  : require('../../Input/Input.less');

export interface InputLikeTextProps {
  align?: 'left' | 'center' | 'right';
  borderless?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  padRight?: boolean;
  warning?: boolean;
  disabled?: boolean;
  size?: InputSize;
  width?: string | number;
  placeholder?: string;
  innerRef?: (el: HTMLElement | null) => void;
  // eslint-disable-next-line flowtype/no-weak-types
  [key: string]: any;
}

interface State {
  blinking: boolean;
}

export default class InputLikeText extends React.Component<
  InputLikeTextProps,
  State
> {
  public static defaultProps = {
    size: 'small'
  };

  public state = {
    blinking: false
  };

  private _node: HTMLElement | null = null;
  private _blinkTimeout: Nullable<TimeoutID>;

  /**
   * @public
   */
  public focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  /**
   * @public
   */
  public blink() {
    this.setState({ blinking: true }, () => {
      this._blinkTimeout = global.setTimeout(
        () => this.setState({ blinking: false }),
        150
      );
    });
  }

  public componentWillUnmount() {
    if (this._blinkTimeout) {
      clearTimeout(this._blinkTimeout);
    }
  }

  public render() {
    const {
      /* eslint-disable no-unused-vars */
      align,
      borderless,
      tabIndex,
      className: cn,
      width,
      children,
      innerRef,
      placeholder: ph,
      error,
      warning,
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
      <label
        className={className}
        style={{ width: this.props.width, textAlign: align }}
      >
        <span
          {...rest}
          tabIndex={this.props.disabled ? -1 : 0}
          className={classNames({
            [styles.input]: true,
            [styles.blink]: this.state.blinking,
            [styles.borderless]: borderless
          })}
          style={{
            position: 'relative'
          }}
          ref={this._ref}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
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

  private _ref = (el: HTMLElement | null) => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this._node = el;
  };

  private _getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: styles.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? styles.sizeMedium
        : styles.DEPRECATED_sizeMedium,
      large: styles.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size!];
  }
}
