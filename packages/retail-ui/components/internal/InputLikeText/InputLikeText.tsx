import * as React from 'react';
import '../../ensureOldIEClassName';
import { Nullable } from '../../../typings/utility-types';
import { IconType, InputVisibilityState } from '../../Input/Input';
import { InputProps } from '../../Input';
import styles from './InputLikeText.module.less';
import { cx } from '../../../lib/theming/Emotion';
import inputStyles from '../../Input/Input.module.less';
import { jsClasses as jsInputStyles } from '../../Input/Input.styles';
import { ThemeConsumer } from '../../ThemeConsumer';
import { Theme } from '../../../lib/theming/Theme';

export interface InputLikeTextProps extends InputProps {
  children?: React.ReactNode;
  innerRef?: (el: HTMLElement | null) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

type InputLikeTextState = InputVisibilityState;

export class InputLikeText extends React.Component<InputLikeTextProps, InputLikeTextState> {
  public static defaultProps = {
    size: 'small',
  };

  public state = {
    blinking: false,
    focused: false,
  };

  private theme!: Theme;
  private node: HTMLElement | null = null;
  private blinkTimeout: Nullable<number>;

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

  public getNode(): HTMLElement | null {
    return this.node;
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }
  }

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
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

    const { focused, blinking } = this.state;

    const className = cx(inputStyles.root, jsInputStyles.root(this.theme), this.getSizeClassName(), {
      [inputStyles.focus]: focused,
      [inputStyles.warning]: !!warning,
      [inputStyles.error]: !!error,
      [inputStyles.borderless]: !!borderless,
      [inputStyles.disabled]: !!disabled,
      [jsInputStyles.focus(this.theme)]: focused,
      [jsInputStyles.blink(this.theme)]: !!blinking,
      [jsInputStyles.warning(this.theme)]: !!warning,
      [jsInputStyles.error(this.theme)]: !!error,
      [jsInputStyles.disabled(this.theme)]: !!disabled,
    });

    return (
      <span
        {...rest}
        className={className}
        style={{ width, textAlign: align }}
        tabIndex={disabled ? undefined : 0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.ref}
      >
        <span className={inputStyles.sideContainer}>
          {this.renderLeftIcon()}
          {prefix && <span className={jsInputStyles.prefix(this.theme)}>{prefix}</span>}
        </span>
        <span className={inputStyles.wrapper}>
          <span className={cx(inputStyles.input, styles.input, jsInputStyles.input(this.theme))}>{children}</span>
          {this.renderPlaceholder()}
        </span>
        <span className={cx(inputStyles.sideContainer, inputStyles.rightContainer)}>
          {suffix && <span className={jsInputStyles.suffix(this.theme)}>{suffix}</span>}
          {this.renderRightIcon()}
        </span>
      </span>
    );
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
      return <span className={cx(inputStyles.placeholder, jsInputStyles.placeholder(this.theme))}>{placeholder}</span>;
    }
    return null;
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return jsInputStyles.sizeLarge(this.theme);
      case 'medium':
        return jsInputStyles.sizeMedium(this.theme);
      case 'small':
      default:
        return jsInputStyles.sizeSmall(this.theme);
    }
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

    return (
      <span className={cx(className, inputStyles.useDefaultColor, jsInputStyles.useDefaultColor(this.theme))}>
        {icon}
      </span>
    );
  }
}
