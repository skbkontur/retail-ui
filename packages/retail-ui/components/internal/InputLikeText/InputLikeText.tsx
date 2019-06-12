import classNames from 'classnames';
import * as React from 'react';

import '../../ensureOldIEClassName';
import Upgrades from '../../../lib/Upgrades';
import { Nullable, TimeoutID } from '../../../typings/utility-types';
import { InputVisibilityState, IconType } from '../../Input/Input';
import { InputProps } from '../../Input';

import styles from './InputLikeText.less';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const inputStyles = isFlatDesign ? require('../../Input/Input.flat.less') : require('../../Input/Input.less');

export interface InputLikeTextProps extends InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

interface InputLikeTextState extends InputVisibilityState {}

export default class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static defaultProps = {
    size: 'small',
  };

  public state = {
    blinking: false,
    focused: false,
  };

  private node: HTMLElement | null = null;
  private blinkTimeout: Nullable<TimeoutID>;

  /**
   * @public
   */
  public focus() {
    if (this.node) {
      this.node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.node) {
      this.node.blur();
    }
  }

  /**
   * @public
   */
  public blink() {
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(() => this.setState({ blinking: false }), 150);
    });
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
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
      disabled,

      prefix,
      suffix,
      leftIcon,
      rightIcon,

      ...rest
    } = this.props;

    const className = classNames(inputStyles.root, this.getSizeClassName(), {
      [inputStyles.disabled]: this.props.disabled,
      [inputStyles.error]: error,
      [inputStyles.warning]: warning,
      [inputStyles.borderless]: borderless,
      [inputStyles.blink]: this.state.blinking,
      [inputStyles.focus]: this.state.focused,
    });

    return (
      <span
        {...rest}
        className={className}
        style={{ width, textAlign: align }}
        tabIndex={this.props.disabled ? undefined : 0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.ref}
      >
        <span className={inputStyles.sideContainer}>
          {this.renderLeftIcon()}
          {prefix && <span className={inputStyles.prefix}>{prefix}</span>}
        </span>
        <span className={inputStyles.wrapper}>
          <span className={classNames(inputStyles.input, styles.input)}>{children}</span>
          {this.renderPlaceholder()}
        </span>
        <span className={classNames(inputStyles.sideContainer, inputStyles.rightContainer)}>
          {suffix && <span className={inputStyles.suffix}>{suffix}</span>}
          {this.renderRightIcon()}
        </span>
      </span>
    );
  }

  public getNode(): HTMLElement | null {
    return this.node;
  }

  private ref = (el: HTMLElement | null) => {
    if (this.props.innerRef) {
      this.props.innerRef(el);
    }
    this.node = el;
  };

  private renderPlaceholder() {
    const { children, placeholder } = this.props;

    if (!children && placeholder) {
      return <span className={inputStyles.placeholder}>{placeholder}</span>;
    }
    return null;
  }

  private getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: inputStyles.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled() ? inputStyles.sizeMedium : inputStyles.DEPRECATED_sizeMedium,
      large: inputStyles.sizeLarge,
    };

    return SIZE_CLASS_NAMES[this.props.size!];
  }

  private handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

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
    return this.renderIcon(this.props.leftIcon, inputStyles.leftIcon);
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, inputStyles.rightIcon);
  }

  private renderIcon(icon: IconType, className: string) {
    if (!icon) {
      return null;
    }

    if (icon instanceof Function) {
      return <span className={className}>{icon()}</span>;
    }

    return <span className={classNames(className, inputStyles.useDefaultColor)}>{icon}</span>;
  }
}
