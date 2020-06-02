import React from 'react';

import { isIE11, isEdge } from '../../lib/utils';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './Button.styles';
import { Corners } from './Corners';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';

export interface ButtonProps {
  /** @ignore */
  _noPadding?: boolean;

  /** @ignore */
  _noRightPadding?: boolean;

  /**
   * Визуально нажатое состояние.
   */
  active?: boolean;

  /** `type TextAlignProperty = "inherit" | "initial" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"` */
  align?: React.CSSProperties['textAlign'];

  /**
   * Кнопка со стрелкой.
   *
   * `type ButtonArrow = boolean | "left"`
   */
  arrow?: boolean | 'left';

  autoFocus?: boolean;

  borderless?: boolean;

  checked?: boolean;

  children?: React.ReactNode;

  /** @ignore */
  corners?: number;

  disabled?: boolean;

  /** @ignore */
  disableFocus?: boolean;

  error?: boolean;

  focused?: boolean;

  /**
   * Иконка слева от текста кнопки.
   */
  icon?: React.ReactElement<any>;

  loading?: boolean;

  narrow?: boolean;

  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  onFocus?: React.FocusEventHandler<HTMLButtonElement>;

  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;

  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;

  /** `type ButtonSize = "small" | "medium" | "large"` */
  size?: ButtonSize;

  /** `type ButtonType = "button" | "submit" | "reset"` */
  type?: ButtonType;

  /**
   * Вариант использования. Влияет на цвет кнопки.
   *
   * `type ButtonUse = "default" | "primary" | "success" | "danger" | "pay" | "link"`
   */
  use?: ButtonUse;

  /** @ignore */
  visuallyFocused?: boolean;

  warning?: boolean;

  width?: number | string;
}

export interface ButtonState {
  focusedByTab: boolean;
}

export class Button extends React.Component<ButtonProps, ButtonState> {
  public static __KONTUR_REACT_UI__ = 'Button';
  public static __BUTTON__ = true;
  public static TOP_LEFT = Corners.TOP_LEFT;
  public static TOP_RIGHT = Corners.TOP_RIGHT;
  public static BOTTOM_RIGHT = Corners.BOTTOM_RIGHT;
  public static BOTTOM_LEFT = Corners.BOTTOM_LEFT;

  public static defaultProps = {
    use: 'default',
    size: 'small',
    type: 'button',
  };

  public state = {
    focusedByTab: false,
    isEdgeOrIE: isIE11 || isEdge,
  };

  private theme!: Theme;
  private node: HTMLButtonElement | null = null;

  public componentDidMount() {
    if (this.props.autoFocus) {
      tabListener.isTabPressed = true;
      this.focus();
    }
  }

  /**
   * @public
   */
  public focus() {
    this.node?.focus();
  }

  /**
   * @public
   */
  public blur() {
    this.node?.blur();
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { corners = 0 } = this.props;

    const stylesArg = {
      theme: this.theme,
      props: this.props,
      state: this.state,
    };
    const sizeClass = this.getSizeClassName(stylesArg);
    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cx({
        [jsStyles.root(stylesArg)]: true,
        [(jsStyles[this.props.use!] && jsStyles[this.props.use!](stylesArg)) || jsStyles.default(stylesArg)]: true,
        [jsStyles.buttonWithIcon(stylesArg)]: !!this.props.icon,
        [sizeClass]: true,
        [jsStyles.narrow(stylesArg)]: !!this.props.narrow,
        [jsStyles.noRightPadding(stylesArg)]: !!this.props._noRightPadding,
        [jsStyles.noPadding(stylesArg)]: !!this.props._noPadding,
        [jsStyles.borderless(stylesArg)]: !!this.props.borderless,
        [jsStyles.focus(stylesArg)]: this.state.focusedByTab || !!this.props.visuallyFocused,
        [jsStyles.checked(stylesArg)]: !!this.props.checked && !this.props.disabled,
        [jsStyles.disabled(stylesArg)]: !!this.props.disabled || !!this.props.loading,
      }),
      style: {
        borderTopLeftRadius: corners & Corners.TOP_LEFT ? 0 : undefined,
        borderTopRightRadius: corners & Corners.TOP_RIGHT ? 0 : undefined,
        borderBottomRightRadius: corners & Corners.BOTTOM_RIGHT ? 0 : undefined,
        borderBottomLeftRadius: corners & Corners.BOTTOM_LEFT ? 0 : undefined,
        textAlign: this.props.align,
      },
      disabled: this.props.disabled || this.props.loading,
      onClick: this.props.onClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
      tabIndex: this.props.disableFocus ? -1 : 0,
    };

    const wrapProps = {
      className: cx({
        [jsStyles.wrap(stylesArg)]: true,
        [jsStyles.wrapArrow(stylesArg)]: this.props.arrow === true,
        [jsStyles.wrapArrowLeft(stylesArg)]: this.props.arrow === 'left',
      }),
      style: {
        width: this.props.width,
      },
    };

    let error = null;
    if (this.props.error) {
      error = <div className={jsStyles.error(stylesArg)} />;
    } else if (this.props.warning) {
      error = <div className={jsStyles.warning(stylesArg)} />;
    }

    let loading = null;
    if (this.props.loading) {
      loading = <div className={jsStyles.loading(stylesArg)} />;
    }

    let icon = this.props.icon;
    if (this.props.icon) {
      icon = <span className={jsStyles.icon(stylesArg)}>{this.props.icon}</span>;
    }

    let arrow = null;
    if (this.props.arrow) {
      arrow = (
        <div
          className={cx({
            // [jsStyles.arrowWarning(stylesArg)]: isWarning,
            // [jsStyles.arrowError(stylesArg)]: isError,
            [jsStyles.arrow(stylesArg)]: true,
            // [jsStyles.arrowLeft(stylesArg)]: this.props.arrow === 'left',
          })}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (this.props.use === 'link') {
      rootProps.className = cx({
        [jsStyles.root(stylesArg)]: true,
        [jsStyles.buttonWithIcon(stylesArg)]: !!this.props.icon,
        [sizeClass]: true,
        [jsStyles.focus(stylesArg)]: this.state.focusedByTab || !!this.props.visuallyFocused,
        [jsStyles.link(stylesArg)]: true,
        [jsStyles.disabled(stylesArg)]: !!this.props.disabled,
      });
      Object.assign(wrapProps, {
        className: jsStyles.wrap(stylesArg),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
      loading = null;
      arrow = null;
    }

    return (
      <span {...wrapProps}>
        <button ref={this._ref} {...rootProps}>
          {error}
          {loading}
          {arrow}
          <div className={jsStyles.caption(stylesArg)}>
            {icon}
            {this.props.children}
          </div>
        </button>
      </span>
    );
  }

  private getSizeClassName(stylesArg: any) {
    switch (this.props.size) {
      case 'large':
        return cx(jsStyles.sizeLarge(stylesArg), {
          [jsStyles.sizeLargeLoading(stylesArg)]: !!this.props.loading,
        });
      case 'medium':
        return cx(jsStyles.sizeMedium(stylesArg), {
          [jsStyles.sizeMediumLoading(stylesArg)]: !!this.props.loading,
        });
      case 'small':
      default:
        return cx(jsStyles.sizeSmall(stylesArg), {
          [jsStyles.sizeSmallLoading(stylesArg)]: !!this.props.loading,
        });
    }
  }

  private handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!this.props.disabled && !this.props.disableFocus) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
      this.props.onFocus?.(e);
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.setState({ focusedByTab: false });
    if (!this.props.disabled && !this.props.disableFocus) {
      this.props.onBlur?.(e);
    }
  };

  private _ref = (node: HTMLButtonElement | null) => {
    this.node = node;
  };
}

export const isButton = (child: React.ReactChild): child is React.ReactElement<ButtonProps> => {
  return React.isValidElement<ButtonProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__BUTTON__')
    : false;
};
