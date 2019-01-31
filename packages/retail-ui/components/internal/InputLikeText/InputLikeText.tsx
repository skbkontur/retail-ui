import classNames from 'classnames';
import * as React from 'react';

import '../../ensureOldIEClassName';
import Upgrades from '../../../lib/Upgrades';
import { Nullable, TimeoutID } from '../../../typings/utility-types';
import { InputVisibilityState, IconType } from '../../Input/Input';
import { InputProps } from '../../Input';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign
  ? require('../../Input/Input.flat.less')
  : require('../../Input/Input.less');

export interface InputLikeTextProps extends InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

interface InputLikeTextState extends InputVisibilityState {}

export default class InputLikeText extends React.Component<
  InputLikeTextProps,
  InputLikeTextState
> {
  public static defaultProps = {
    size: 'small'
  };

  public state = {
    blinking: false,
    focused: false
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
      innerRef,
      tabIndex,
      placeholder,
      align,
      borderless,
      width,
      children,
      error,
      warning,
      onChange,

      prefix,
      suffix,
      leftIcon,
      rightIcon,

      ...rest
    } = this.props;

    const className = classNames(styles.root, this._getSizeClassName(), {
      [styles.disabled]: this.props.disabled,
      [styles.error]: error,
      [styles.warning]: warning,
      [styles.borderless]: borderless,
      [styles.blink]: this.state.blinking,
      [styles.focus]: this.state.focused
    });

    return (
      <span
        {...rest}
        className={className}
        style={{ width, textAlign: align }}
        tabIndex={this.props.disabled ? undefined : 0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this._ref}
      >
        <span className={styles.sideContainer}>
          {this.renderLeftIcon()}
          {prefix && <span className={styles.prefix}>{prefix}</span>}
        </span>
        <span className={styles.wrapper}>
          <span className={styles.input}>{children}</span>
          {this.renderPlaceholder()}
        </span>
        <span
          className={classNames(styles.sideContainer, styles.rightContainer)}
        >
          {suffix && <span className={styles.suffix}>{suffix}</span>}
          {this.renderRightIcon()}
        </span>
      </span>
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

  private handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  private handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, styles.leftIcon);
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, styles.rightIcon);
  }

  private renderIcon(icon: IconType, className: string) {
    if (!icon) {
      return null;
    }

    if (icon instanceof Function) {
      return <span className={className}>{icon()}</span>;
    }

    return (
      <span className={classNames(className, styles.useDefaultColor)}>
        {icon}
      </span>
    );
  }
}
