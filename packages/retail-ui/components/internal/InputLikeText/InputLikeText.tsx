import classNames from 'classnames';
import * as React from 'react';

import '../../ensureOldIEClassName';
import Upgrades from '../../../lib/Upgrades';
import { InputSize } from '../../Input';
import { Nullable, TimeoutID } from '../../../typings/utility-types';

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
      this._blinkTimeout = window.setTimeout(
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
      className: cn,
      innerRef,
      tabIndex,
      placeholder,
      align,
      borderless,
      width,
      children,
      error,
      warning,
      padRight,
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

    return (
      <label className={className} style={{ width, textAlign: align }}>
        <span
          {...rest}
          tabIndex={this.props.disabled ? undefined : 0}
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
              {children}
            </span>
          </span>
        </span>
        {this.renderPlaceholder()}
      </label>
    );
  }

  private _ref = (el: HTMLElement | null) => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this._node = el;
  };

  private renderPlaceholder() {
    const { children, placeholder } = this.props;

    if (!children && placeholder) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }
    return null;
  }

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
