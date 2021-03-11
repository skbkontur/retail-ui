import React from 'react';
import cn from 'classnames';

import { isIE11, isEdge } from '../../lib/client';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Button.styles';
import { Corners } from './Corners';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';

export interface ButtonProps extends CommonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
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
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = (props: CommonWrapperRestProps<ButtonProps>) => {
    const {
      onFocus,
      onBlur,
      size,
      error,
      use,
      visuallyFocused,
      warning,
      width,
      narrow,
      loading,
      icon,
      disableFocus,
      focused,
      corners = 0,
      checked,
      disabled,
      borderless,
      arrow,
      align,
      _noPadding,
      _noRightPadding,
      active,
      tabIndex,
      ...rest
    } = props;
    const sizeClass = this.getSizeClassName();

    const isError = !!error;
    const isWarning = !!warning;
    const rootProps = {
      ...rest,
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cn({
        [jsStyles.root(this.theme)]: true,
        [(jsStyles[use!] && jsStyles[use!](this.theme)) || jsStyles.default(this.theme)]: true,
        [jsStyles.active(this.theme)]: !!active,
        [jsStyles.validationRoot(this.theme)]: isError || isWarning,
        [jsStyles.narrow()]: !!narrow,
        [jsStyles.noPadding()]: !!_noPadding,
        [jsStyles.noRightPadding()]: !!_noRightPadding,
        [sizeClass]: true,
        [jsStyles.borderless(this.theme)]: !!borderless,
        [jsStyles.focus(this.theme)]: this.state.focusedByTab || !!visuallyFocused,
        [jsStyles.checked(this.theme)]: !!checked,
        [jsStyles.disabled(this.theme)]: !!disabled || !!loading,
        [jsStyles.fallback(this.theme)]: isIE11 || isEdge,
      }),
      style: {
        borderTopLeftRadius: corners & Corners.TOP_LEFT ? 0 : undefined,
        borderTopRightRadius: corners & Corners.TOP_RIGHT ? 0 : undefined,
        borderBottomRightRadius: corners & Corners.BOTTOM_RIGHT ? 0 : undefined,
        borderBottomLeftRadius: corners & Corners.BOTTOM_LEFT ? 0 : undefined,
        textAlign: align,
      },
      disabled: disabled || loading,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      tabIndex: disableFocus ? -1 : tabIndex,
    };

    const wrapProps = {
      className: cn({
        [jsStyles.wrap(this.theme)]: true,
        [jsStyles.wrapArrow()]: arrow === true,
        [jsStyles.wrapArrowLeft()]: arrow === 'left',
      }),
      style: {
        width,
      },
    };

    let errorNode = null;
    if (error) {
      errorNode = <div className={jsStyles.error(this.theme)} />;
    } else if (warning) {
      errorNode = <div className={jsStyles.warning(this.theme)} />;
    }

    let loadingNode = null;
    if (loading && !icon) {
      loadingNode = <div className={jsStyles.loading()}>{this.getLoadingSpinner()}</div>;
    }

    let iconNode = icon;
    if (icon) {
      iconNode = (
        <span
          className={cn(jsStyles.icon(), this.getSizeIconClassName(), {
            [jsStyles.iconNoRightPadding()]: !this.props.children,
            [jsStyles.iconLink(this.theme)]: use === 'link',
          })}
        >
          {loading ? this.getLoadingSpinner() : icon}
        </span>
      );
    }

    let arrowNode = null;
    if (arrow) {
      arrowNode = (
        <div
          className={cn({
            [jsStyles.arrow()]: true,
            [jsStyles.arrowWarning(this.theme)]: isWarning,
            [jsStyles.arrowError(this.theme)]: isError,
            [jsStyles.arrowFocus(this.theme)]: this.state.focusedByTab || !!visuallyFocused,
            [jsStyles.arrowLeft()]: arrow === 'left',
          })}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (use === 'link') {
      rootProps.className = cn({
        [jsStyles.root(this.theme)]: true,
        [sizeClass]: true,
        [jsStyles.focus(this.theme)]: this.state.focusedByTab || !!visuallyFocused,
        [jsStyles.link(this.theme)]: true,
        [jsStyles.disabled(this.theme)]: !!disabled || !!loading,
      });
      Object.assign(wrapProps, {
        className: cn(jsStyles.wrap(this.theme), {
          [jsStyles.wrapLink(this.theme)]: use === 'link',
        }),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
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
            <span className={cn({ [jsStyles.visibilityHidden()]: loadingNode })}>{this.props.children}</span>
          </div>
        </button>
      </span>
    );
  };

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
