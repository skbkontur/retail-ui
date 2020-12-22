import React from 'react';
import cn from 'classnames';

import { isIE11, isEdge } from '../../lib/utils';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';

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
    const sizeClass = this.getSizeClassName();

    const isError = !!this.props.error;
    const isWarning = !!this.props.warning;
    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cn({
        [jsStyles.root(this.theme)]: true,
        [(jsStyles[this.props.use!] && jsStyles[this.props.use!](this.theme)) || jsStyles.default(this.theme)]: true,
        [jsStyles.active(this.theme)]: !!this.props.active,
        [jsStyles.validationRoot(this.theme)]: isError || isWarning,
        [jsStyles.narrow()]: !!this.props.narrow,
        [jsStyles.noPadding()]: !!this.props._noPadding,
        [jsStyles.noRightPadding()]: !!this.props._noRightPadding,
        [sizeClass]: true,
        [jsStyles.borderless(this.theme)]: !!this.props.borderless,
        [jsStyles.focus(this.theme)]: this.state.focusedByTab || !!this.props.visuallyFocused,
        [jsStyles.checked(this.theme)]: !!this.props.checked,
        [jsStyles.disabled(this.theme)]: !!this.props.disabled || !!this.props.loading,
        [jsStyles.fallback(this.theme)]: isIE11 || isEdge,
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
      className: cn({
        [jsStyles.wrap(this.theme)]: true,
        [jsStyles.wrapArrow()]: this.props.arrow === true,
        [jsStyles.wrapArrowLeft()]: this.props.arrow === 'left',
      }),
      style: {
        width: this.props.width,
      },
    };

    let error = null;
    if (this.props.error) {
      error = <div className={jsStyles.error(this.theme)} />;
    } else if (this.props.warning) {
      error = <div className={jsStyles.warning(this.theme)} />;
    }

    let loading = null;
    if (this.props.loading) {
      loading = <div className={jsStyles.loading()}>{this.getLoadingSpinner()}</div>;
    }

    let icon = this.props.icon;
    if (this.props.icon) {
      icon = (
        <span className={cn(jsStyles.icon(), this.getSizeIconClassName())}>
          {loading ? this.getLoadingSpinner() : this.props.icon}
        </span>
      );
    }

    let arrow = null;
    if (this.props.arrow) {
      arrow = (
        <div
          className={cn({
            [jsStyles.arrowWarning(this.theme)]: isWarning,
            [jsStyles.arrowError(this.theme)]: isError,
            [jsStyles.arrow()]: true,
            [jsStyles.arrowLeft(this.theme)]: this.props.arrow === 'left',
          })}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (this.props.use === 'link') {
      rootProps.className = cn({
        [jsStyles.root(this.theme)]: true,
        [sizeClass]: true,
        [jsStyles.focus(this.theme)]: this.state.focusedByTab || !!this.props.visuallyFocused,
        [jsStyles.link(this.theme)]: true,
        [jsStyles.disabled(this.theme)]: !!this.props.disabled || !!this.props.loading,
      });
      Object.assign(wrapProps, {
        className: cn(jsStyles.wrap(this.theme), {
          [jsStyles.wrapLink(this.theme)]: this.props.use === 'link',
        }),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
      arrow = null;
    }

    return (
      <span {...wrapProps}>
        <button ref={this._ref} {...rootProps}>
          {error}
          {!icon && loading}
          {arrow}
          <div className={jsStyles.caption()}>
            {icon}
            {loading && !icon ? this.getHiddenChildren() : this.props.children}
          </div>
        </button>
      </span>
    );
  }

  private getHiddenChildren() {
    return <span className={jsStyles.visibilityHidden()}>{this.props.children}</span>;
  }

  private getLoadingSpinner() {
    return <Spinner caption={null} dimmed type="mini" />;
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return cn(jsStyles.sizeLarge(this.theme));
      case 'medium':
        return cn(jsStyles.sizeMedium(this.theme));
      case 'small':
      default:
        return cn(jsStyles.sizeSmall(this.theme));
    }
  }
  private getSizeIconClassName() {
    switch (this.props.size) {
      case 'large':
        return jsStyles.iconLarge(this.theme);
      case 'medium':
        return jsStyles.iconMedium(this.theme);
      case 'small':
      default:
        return jsStyles.iconSmall(this.theme);
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
