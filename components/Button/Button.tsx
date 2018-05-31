import * as events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';
import Upgrades from '../../lib/Upgrades';

import Corners from './Corners';
import Icon from '../Icon';

import '../ensureOldIEClassName';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

import CssStyles = require('./Button.less');
import { IconName } from '../Icon';

const classes: typeof CssStyles = isFlatDesign
  ? require('./Button.flat.less')
  : require('./Button.less');

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', event => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonUse =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'pay'
  | 'link';

export interface ButtonProps {
  /** @ignore */
  _noPadding?: boolean;

  /** @ignore */
  _noRightPadding?: boolean;

  /**
   * Визуально нажатое состояние.
   */
  active?: boolean;

  // tslint:disable-next-line:max-line-length
  /** `type TextAlignProperty = "inherit" | "initial" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"` */
  align?: React.CSSProperties['textAlign'];

  /**
   * Кнопка со стрелкой.
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
  icon?: IconName;

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

class Button extends React.Component<ButtonProps, ButtonState> {
  public static TOP_LEFT = Corners.TOP_LEFT;
  public static TOP_RIGHT = Corners.TOP_RIGHT;
  public static BOTTOM_RIGHT = Corners.BOTTOM_RIGHT;
  public static BOTTOM_LEFT = Corners.BOTTOM_LEFT;

  public static defaultProps = {
    use: 'default',
    size: 'small',
    type: 'button'
  };

  public state = {
    focusedByTab: false
  };

  private _node: HTMLButtonElement | null = null;

  public componentDidMount() {
    listenTabPresses();

    if (this.props.autoFocus) {
      tabPressed = true;
      this.focus();
    }
  }

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

  public render() {
    const { corners = 0 } = this.props;
    const radius = '2px';

    const SIZE_CLASSES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? classes.sizeMedium
        : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge
    };

    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: classNames({
        [classes.root]: true,
        [(classes as { [name: string]: string })[this.props.use!] ||
        classes.default]: true,
        [classes.active]: this.props.active,
        [classes.checked]: this.props.checked,
        [classes.disabled]: this.props.disabled || this.props.loading,
        [classes.narrow]: this.props.narrow,
        [classes.noPadding]: this.props._noPadding,
        [classes.noRightPadding]: this.props._noRightPadding,
        [classes.buttonWithIcon]: !!this.props.icon,
        [SIZE_CLASSES[this.props.size!]]: true,
        [classes.focus]: this.state.focusedByTab || this.props.visuallyFocused,
        [classes.borderless]: this.props.borderless
      }),
      style: {
        borderRadius:
          `${corners & Corners.TOP_LEFT ? 0 : radius}` +
          ` ${corners & Corners.TOP_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_LEFT ? 0 : radius}`,
        textAlign: this.props.align
      },
      disabled: this.props.disabled || this.props.loading,
      onClick: this.props.onClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
      tabIndex: this.props.disableFocus ? -1 : 0
    };

    const wrapProps = {
      className: this.props.arrow
        ? classNames(
            classes.wrap_arrow,
            this.props.arrow === 'left' && classes.wrap_arrow_left
          ) || ''
        : classes.wrap,
      style: {
        width: this.props.width
      }
    };

    let error = null;
    if (this.props.error) {
      error = <div className={classes.error} />;
    } else if (this.props.warning) {
      error = <div className={classes.warning} />;
    }

    let loading = null;
    if (this.props.loading) {
      loading = <div className={classes.loading} />;
    }

    let icon = null;
    if (this.props.icon) {
      icon = (
        <span className={classes.icon}>
          <Icon name={this.props.icon} />
        </span>
      );
    }

    let arrow = null;
    if (this.props.arrow) {
      arrow = (
        <div
          className={classNames({
            [classes.arrow || '']: true,
            [classes.arrow_left || '']: this.props.arrow === 'left',
            [classes.arrow_loading || '']: this.props.loading,
            [classes.arrow_error || '']: this.props.error,
            [classes.arrow_warning || '']: this.props.warning
          })}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (this.props.use === 'link') {
      rootProps.className = classNames({
        [classes.root]: true,
        [classes.link]: true,
        [classes.disabled]: this.props.disabled,
        [classes.buttonWithIcon]: !!this.props.icon,
        [SIZE_CLASSES[this.props.size!]]: true,
        [classes.focus]: this.state.focusedByTab || this.props.visuallyFocused
      });
      Object.assign(wrapProps, {
        className: classes.wrap,
        style: { width: wrapProps.style.width }
      });
      rootProps.style.textAlign = undefined;
      error = null;
      loading = null;
      arrow = null;
    }

    return (
      <span {...wrapProps}>
        <button ref={this._ref} {...rootProps}>
          {loading}
          {arrow}
          <div className={classes.caption}>
            {icon}
            {this.props.children}
          </div>
          {error}
        </button>
      </span>
    );
  }

  private handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!this.props.disabled && !this.props.disableFocus) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
        }
      });
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.setState({ focusedByTab: false });
    if (!this.props.disabled && !this.props.disableFocus) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  };

  private _ref = (node: HTMLButtonElement | null) => {
    this._node = node;
  };
}

export default Button;
