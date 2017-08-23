// @flow
import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import Corners from './Corners';
import Icon from '../Icon';

import '../ensureOldIEClassName';
import styles from './Button.less';

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

const SIZE_CLASSES = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge
};

type Props = {
  _noPadding?: boolean,
  _noRightPadding?: boolean,
  active?: boolean,
  arrow?: boolean,
  autoFocus?: boolean,
  checked?: boolean,
  children?: string,
  corners?: number, // internal
  disabled?: boolean,
  focused?: boolean,
  icon?: string,
  loading?: boolean,
  narrow?: boolean,
  onClick?: (e: SyntheticMouseEvent<>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  size: 'small' | 'medium' | 'large',
  type: 'button' | 'submit' | 'reset',
  use: 'default' | 'primary' | 'success' | 'danger' | 'pay' | 'link',
  width?: number | string
};

class Button extends React.Component<
  Props,
  {
    focusedByTab: boolean
  }
> {
  static TOP_LEFT = Corners.TOP_LEFT;
  static TOP_RIGHT = Corners.TOP_RIGHT;
  static BOTTOM_RIGHT = Corners.BOTTOM_RIGHT;
  static BOTTOM_LEFT = Corners.BOTTOM_LEFT;

  static propTypes = {
    /**
     * Визуально нажатое состояние.
     */
    active: PropTypes.bool,

    /**
     * Кнопка со стрелкой.
     */
    arrow: PropTypes.bool,

    /**
     * Автофокус
     */
    autoFocus: PropTypes.bool,

    checked: PropTypes.bool,

    disabled: PropTypes.bool,

    focused: PropTypes.bool,

    /**
     * Иконка слева от текста кнопки.
     */
    icon: PropTypes.string,

    loading: PropTypes.bool,

    narrow: PropTypes.bool,

    size: PropTypes.oneOf(['small', 'medium', 'large']),

    /**
     * Вариант использования. Влияет на цвет кнопки.
     */
    use: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'pay',
      'link'
    ]),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Click handler.
     */
    onClick: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    use: 'default',
    size: 'small',
    type: 'button'
  };

  state: {
    focusedByTab: boolean
  } = {
    focusedByTab: false
  };

  _node: ?HTMLButtonElement = null;

  componentDidMount() {
    listenTabPresses();

    if (this.props.autoFocus) {
      tabPressed = true;
      this.focus();
    }
  }

  /**
   * @api
   */
  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @api
   */
  blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  handleFocus = (e: SyntheticFocusEvent<>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabPressed) {
          this.setState({ focusedByTab: true });
          tabPressed = false;
        }
      });
    }
  };

  handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  render() {
    const { corners = 0 } = this.props;
    const radius = '2px';

    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: classNames({
        [styles.root]: true,
        [styles['use-' + this.props.use]]: true,
        [styles.active]: this.props.active,
        [styles.checked]: this.props.checked,
        [styles.disabled]: this.props.disabled || this.props.loading,
        [styles.narrow]: this.props.narrow,
        [styles.noPadding]: this.props._noPadding,
        [styles.noRightPadding]: this.props._noRightPadding,
        [styles.buttonWithIcon]: !!this.props.icon,
        [styles.arrowButton]: this.props.arrow,
        [SIZE_CLASSES[this.props.size]]: true,
        [styles.focus]: this.state.focusedByTab
      }),
      style: {
        borderRadius:
          `${corners & Corners.TOP_LEFT ? 0 : radius}` +
          ` ${corners & Corners.TOP_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_LEFT ? 0 : radius}`,
        textAlign: undefined
      },
      disabled: this.props.disabled || this.props.loading,
      onClick: this.props.onClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver
    };
    if (this.props.align) {
      rootProps.style.textAlign = this.props.align;
    }

    const wrapProps = {
      className: this.props.arrow ? styles.wrap_arrow : styles.wrap,
      style: {
        width: undefined
      }
    };
    if (this.props.width) {
      wrapProps.style.width = this.props.width;
    }

    let error = null;
    if (this.props.error) {
      error = <div className={styles.error} />;
    } else if (this.props.warning) {
      error = <div className={styles.warning} />;
    }

    let loading = null;
    if (this.props.loading) {
      loading = <div className={styles.loading} />;
    }

    let icon = null;
    if (this.props.icon) {
      icon = (
        <span className={styles.icon}>
          <Icon name={this.props.icon} />
        </span>
      );
    }

    let arrow = null;
    if (this.props.arrow) {
      arrow = (
        <div
          className={classNames(
            styles.arrow,
            this.props.loading ? styles.arrow_loading : '',
            this.props.error ? styles.arrow_error : '',
            this.props.warning ? styles.arrow_warning : ''
          )}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (this.props.use === 'link') {
      rootProps.className = classNames({
        [styles.root]: true,
        [styles['use-link']]: true,
        [styles.disabled]: this.props.disabled,
        [styles.buttonWithIcon]: !!this.props.icon
      });
      Object.assign(wrapProps, {
        className: styles.wrap,
        style: { width: wrapProps.style.width }
      });
      rootProps.style.textAlign = null;
      error = null;
      loading = null;
      arrow = null;
    }

    return (
      <span {...wrapProps}>
        <button ref={this._ref} {...rootProps}>
          {loading}
          {arrow}
          <div className={styles.caption}>
            {icon}
            {this.props.children}
          </div>
          {error}
        </button>
      </span>
    );
  }

  _ref = node => {
    this._node = node;
  };
}

export default Button;
