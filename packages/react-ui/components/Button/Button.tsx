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
  isEdgeOrIE: boolean;
}

const getStylesProps = (theme: Theme, props: ButtonProps, state: ButtonState) => {
  const { use, active, visuallyFocused, checked, disabled, error, warning, loading, arrow } = props;
  const { focusedByTab, isEdgeOrIE } = state;
  return {
    theme,
    isLink: use === 'link',
    isActive: Boolean(active),
    isChecked: Boolean(checked),
    isFocused: Boolean(focusedByTab || visuallyFocused),
    isDisabled: Boolean(disabled),
    isError: Boolean(error),
    isWarning: Boolean(warning),
    isLoading: Boolean(loading),
    isArrow: Boolean(arrow),
    isArrowLeft: arrow === 'left',
    isEdgeOrIE,
  };
};

export type ButtonStylesProps = ReturnType<typeof getStylesProps>;

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
    isEdgeOrIE: isEdge || isIE11,
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
    const stylesProps = getStylesProps(this.theme, this.props, this.state);
    const { isChecked, isFocused, isDisabled, isError, isWarning, isLoading, isArrow, isLink } = stylesProps;

    const sizeClass = this.getSizeClassName(stylesProps);
    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cx({
        [jsStyles.root(stylesProps)]: true,
        [(jsStyles[this.props.use!] && jsStyles[this.props.use!](stylesProps)) || jsStyles.default(stylesProps)]: true,
        [jsStyles.buttonWithIcon(stylesProps)]: !!this.props.icon,
        [sizeClass]: true,
        [jsStyles.narrow(stylesProps)]: !!this.props.narrow,
        [jsStyles.noRightPadding(stylesProps)]: !!this.props._noRightPadding,
        [jsStyles.noPadding(stylesProps)]: !!this.props._noPadding,
        [jsStyles.borderless(stylesProps)]: !!this.props.borderless,
        [jsStyles.focus(stylesProps)]: isFocused,
        [jsStyles.checked(stylesProps)]: isChecked && !isDisabled,
        [jsStyles.disabled(stylesProps)]: isDisabled || isLoading,
      }),
      style: {
        borderTopLeftRadius: corners & Corners.TOP_LEFT ? 0 : undefined,
        borderTopRightRadius: corners & Corners.TOP_RIGHT ? 0 : undefined,
        borderBottomRightRadius: corners & Corners.BOTTOM_RIGHT ? 0 : undefined,
        borderBottomLeftRadius: corners & Corners.BOTTOM_LEFT ? 0 : undefined,
        textAlign: this.props.align,
      },
      disabled: isDisabled || isLoading,
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
        [jsStyles.wrap(stylesProps)]: true,
        [jsStyles.wrapArrow(stylesProps)]: isArrow,
      }),
      style: {
        width: this.props.width,
      },
    };

    let error = null;
    if (isError) {
      error = <div className={jsStyles.error(stylesProps)} />;
    } else if (isWarning) {
      error = <div className={jsStyles.warning(stylesProps)} />;
    }

    let loading = null;
    if (isLoading) {
      loading = <div className={jsStyles.loading(stylesProps)} />;
    }

    let icon = this.props.icon;
    if (this.props.icon) {
      icon = <span className={jsStyles.icon(stylesProps)}>{this.props.icon}</span>;
    }

    let arrow = null;
    if (isArrow) {
      arrow = <div className={jsStyles.arrow(stylesProps)} />;
    }

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = cx({
        [jsStyles.root(stylesProps)]: true,
        [jsStyles.link(stylesProps)]: true,
        [sizeClass]: true,
        [jsStyles.focus(stylesProps)]: isFocused,
        [jsStyles.disabled(stylesProps)]: isDisabled,
      });
      Object.assign(wrapProps, {
        className: jsStyles.wrap(stylesProps),
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
          <div className={jsStyles.caption(stylesProps)}>
            {icon}
            {this.props.children}
          </div>
        </button>
      </span>
    );
  }

  private getSizeClassName(stylesProps: ButtonStylesProps) {
    switch (this.props.size) {
      case 'large':
        return jsStyles.sizeLarge(stylesProps);
      case 'medium':
        return jsStyles.sizeMedium(stylesProps);
      case 'small':
      default:
        return jsStyles.sizeSmall(stylesProps);
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
