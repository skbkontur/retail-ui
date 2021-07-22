import React from 'react';

import { isIE11, isEdge } from '../../lib/client';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Spinner } from '../Spinner';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles, activeStyles } from './Button.styles';
import { Corners } from './Corners';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonUse = 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link';

export interface ButtonProps extends CommonProps {
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
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const {
      corners = 0,
      active,
      disabled,
      borderless,
      checked,
      error,
      warning,
      loading,
      arrow,
      narrow,
      icon,
      _noPadding,
      _noRightPadding,
      use,
      visuallyFocused,
      align,
      disableFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onKeyDown,
      onClick,
      width,
      children,
    } = this.props;
    const sizeClass = this.getSizeClassName();

    const isFocused = this.state.focusedByTab || visuallyFocused;
    const isLink = use === 'link';
    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: cx({
        [jsStyles.root(this.theme)]: true,
        [jsStyles[use!](this.theme)]: true,
        [activeStyles[use!](this.theme)]: active,
        [sizeClass]: true,
        [jsStyles.focus(this.theme)]: isFocused && !checked,
        [jsStyles.checked(this.theme)]: checked,
        [jsStyles.disabled(this.theme)]: disabled || loading,
        [jsStyles.checkedDisabled(this.theme)]: checked && disabled,
        [jsStyles.borderless()]: borderless && !disabled && !loading && !checked && !isFocused && !active,
        [jsStyles.narrow()]: narrow,
        [jsStyles.noPadding()]: _noPadding,
        [jsStyles.noRightPadding()]: _noRightPadding,
      }),
      style: {
        borderTopLeftRadius: corners & Corners.TOP_LEFT ? 0 : undefined,
        borderTopRightRadius: corners & Corners.TOP_RIGHT ? 0 : undefined,
        borderBottomRightRadius: corners & Corners.BOTTOM_RIGHT ? 0 : undefined,
        borderBottomLeftRadius: corners & Corners.BOTTOM_LEFT ? 0 : undefined,
        textAlign: align,
      },
      disabled: disabled || loading,
      onClick: onClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: onKeyDown,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onMouseOver: onMouseOver,
      tabIndex: disableFocus ? -1 : 0,
    };

    const wrapProps = {
      className: cx({
        [jsStyles.wrap()]: true,
        [jsStyles.wrapArrow()]: arrow === true,
        [jsStyles.wrapArrowLeft()]: arrow === 'left',
      }),
      style: {
        width: width,
      },
    };

    let outlineNode = null;
    if (!isFocused || isLink) {
      outlineNode = (
        <div
          className={cx(jsStyles.outline(), {
            [jsStyles.outlineWarning(this.theme)]: warning,
            [jsStyles.outlineError(this.theme)]: error,
            [jsStyles.outlineLink()]: isLink,
            [jsStyles.outlineLinkError(this.theme)]: isLink && error,
          })}
        />
      );
    }

    let loadingNode = null;
    if (loading && !icon) {
      loadingNode = <div className={jsStyles.loading()}>{this.getLoadingSpinner()}</div>;
    }

    let iconNode = null;
    if (icon) {
      iconNode = (
        <span
          className={cx(jsStyles.icon(), this.getSizeIconClassName(), {
            [jsStyles.iconNoRightPadding()]: !children,
            [jsStyles.iconLink(this.theme)]: isLink,
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
          className={cx({
            [jsStyles.arrow()]: true,
            [jsStyles.arrowWarning(this.theme)]: !checked && warning,
            [jsStyles.arrowError(this.theme)]: !checked && error,
            [jsStyles.arrowFocus(this.theme)]: !checked && isFocused,
            [jsStyles.arrowLeft()]: arrow === 'left',
          })}
        >
          <div data-arrow-helper data-arrow-helper-top />
          <div data-arrow-helper data-arrow-helper-bottom />
        </div>
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (isLink) {
      rootProps.className = cx({
        [jsStyles.root(this.theme)]: true,
        [sizeClass]: true,
        [jsStyles.link(this.theme)]: true,
        [jsStyles.linkFocus(this.theme)]: isFocused,
        [jsStyles.linkDisabled(this.theme)]: disabled || loading,
      });
      Object.assign(wrapProps, {
        className: cx(jsStyles.wrap(), jsStyles.wrapLink()),
        style: { width: wrapProps.style.width },
      });
      rootProps.style.textAlign = undefined;
      arrowNode = null;
    }

    return (
      <CommonWrapper {...this.props}>
        <span {...wrapProps}>
          <button ref={this._ref} {...rootProps}>
            {outlineNode}
            {loadingNode}
            {arrowNode}
            <div
              className={cx(jsStyles.caption(), {
                [jsStyles.captionTranslated()]: active || checked,
                [jsStyles.captionLink()]: isLink,
                [jsStyles.captionDisabled()]: !checked && disabled,
              })}
              data-caption
            >
              {iconNode}
              <span className={cx({ [jsStyles.visibilityHidden()]: !!loadingNode })}>{children}</span>
            </div>
          </button>
        </span>
      </CommonWrapper>
    );
  }

  private getLoadingSpinner() {
    return <Spinner caption={null} dimmed type="mini" />;
  }

  private getSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return cx(jsStyles.sizeLarge(this.theme), { [jsStyles.sizeLargeIE11(this.theme)]: isIE11 || isEdge });
      case 'medium':
        return cx(jsStyles.sizeMedium(this.theme), { [jsStyles.sizeMediumIE11(this.theme)]: isIE11 || isEdge });
      case 'small':
      default:
        return cx(jsStyles.sizeSmall(this.theme), { [jsStyles.sizeSmallIE11(this.theme)]: isIE11 || isEdge });
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
      requestAnimationFrame(() => {
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
