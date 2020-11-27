import React from 'react';
import cn from 'classnames';
import shallowEqual from 'shallowequal';

import { isIE11, isEdge } from '../../lib/utils';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './Button.styles';
import { Corners } from './Corners';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';

export interface ButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
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

  /** `type ButtonSize = "small" | "medium" | "large"` */
  size?: ButtonSize;

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
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** `type ButtonType = "button" | "submit" | "reset"` */
  type?: ButtonType;
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
    buttonProps: {
      type: 'button',
      tabIndex: 0,
    },
  };

  public static getButtonProps = (props: ButtonProps): React.ButtonHTMLAttributes<HTMLButtonElement> => {
    const { type, buttonProps } = props;
    return Object.assign({}, Button.defaultProps.buttonProps, buttonProps, { type });
  };

  public state = {
    focusedByTab: false,
  };

  private theme!: Theme;
  private node: HTMLButtonElement | null = null;

  public componentDidMount() {
    if (Button.getButtonProps(this.props).autoFocus) {
      tabListener.isTabPressed = true;
      // this.focus();
    }
  }

  public shouldComponentUpdate(nextProps: ButtonProps) {
    const { buttonProps: currentButtonProps, ...currentRestProps } = this.props;
    const { buttonProps: nextButtonProps, ...nextRestProps } = nextProps;
    return (
      !shallowEqual(currentRestProps, nextRestProps) ||
      !shallowEqual(Button.getButtonProps(this.props), Button.getButtonProps(nextProps))
    );
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
    const {
      // bussiness props
      corners = 0,
      _noPadding,
      _noRightPadding,
      active,
      align,
      arrow,
      borderless,
      checked,
      disableFocus,
      error,
      focused,
      icon,
      loading,
      narrow,
      size,
      use,
      visuallyFocused,
      warning,
      width,
      type,
      // button props
      buttonProps: buttonSpecificProps,
      // root span props
      ...rest
    } = this.props;
    const sizeClass = this.getSizeClassName();

    const buttonProps = Button.getButtonProps(this.props);

    const isError = !!this.props.error;
    const isWarning = !!this.props.warning;
    const rootProps = {
      ...buttonProps,
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
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: this.props.disableFocus ? -1 : buttonProps.tabIndex,
    };

    const wrapProps = {
      ...rest,
      className: cn(rest.className, {
        [jsStyles.wrap(this.theme)]: true,
        [jsStyles.wrapArrow()]: this.props.arrow === true,
        [jsStyles.wrapArrowLeft()]: this.props.arrow === 'left',
      }),
      style: {
        width: this.props.width,
      },
    };

    let errorNode = null;
    if (this.props.error) {
      errorNode = <div className={jsStyles.error(this.theme)} />;
    } else if (this.props.warning) {
      errorNode = <div className={jsStyles.warning(this.theme)} />;
    }

    let loadingNode = null;
    if (this.props.loading) {
      loadingNode = <div className={jsStyles.loading()} />;
    }

    let iconNode = this.props.icon;
    if (this.props.icon) {
      iconNode = <span className={cn(jsStyles.icon(), this.getSizeIconClassName())}>{this.props.icon}</span>;
    }

    let arrowNode = null;
    if (this.props.arrow) {
      arrowNode = (
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
        [jsStyles.disabled(this.theme)]: !!this.props.disabled,
      });
      Object.assign(wrapProps, {
        className: cn(jsStyles.wrap(this.theme), {
          [jsStyles.wrapLink(this.theme)]: this.props.use === 'link',
        }),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
      loadingNode = null;
      arrowNode = null;
    }

    return (
      <span {...wrapProps}>
        <button ref={this._ref} {...rootProps}>
          {errorNode}
          {loadingNode}
          {arrowNode}
          <div className={jsStyles.caption()}>
            {iconNode}
            {this.props.children}
          </div>
        </button>
      </span>
    );
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return cn(jsStyles.sizeLarge(this.theme), {
          [jsStyles.sizeLargeLoading(this.theme)]: this.props.loading,
        });
      case 'medium':
        return cn(jsStyles.sizeMedium(this.theme), {
          [jsStyles.sizeMediumLoading(this.theme)]: this.props.loading,
        });
      case 'small':
      default:
        return cn(jsStyles.sizeSmall(this.theme), {
          [jsStyles.sizeSmallLoading(this.theme)]: this.props.loading,
        });
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
    } else {
      e.stopPropagation();
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.setState({ focusedByTab: false });
    if (this.props.disabled || this.props.disableFocus) {
      e.stopPropagation();
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
