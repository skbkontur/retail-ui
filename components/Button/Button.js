// @flow
import classNames from 'classnames';
import * as React from 'react';
import styled from '../internal/styledRender';

import PropTypes from 'prop-types';

import Corners from './Corners';
import Icon from '../Icon';

import '../ensureOldIEClassName';
import '../ensureFocusRingPolyfill';

let cssStyles;
let jssStyles;
if (process.env.EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./Button.styles').default;
} else {
  cssStyles = require('./Button.less');
}

type Props = {
  /** @internal */
  _noPadding?: boolean,
  /** @internal */
  _noRightPadding?: boolean,
  active?: boolean,
  arrow?: boolean,
  autoFocus?: boolean,
  checked?: boolean,
  children?: string,
  /** @internal */
  corners?: number,
  disabled?: boolean,
  /** @internal */
  disableFocus?: boolean,
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
  /** @internal */
  visuallyFocused?: boolean,
  width?: number | string
};

class Button extends React.Component<Props> {
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

    disableFocus: PropTypes.bool,

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

    visuallyFocused: PropTypes.bool,

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

  _node: ?HTMLButtonElement = null;

  componentDidMount() {
    if (this.props.autoFocus) {
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

  render = styled(cssStyles, jssStyles, classes => {
    const { corners = 0 } = this.props;
    const radius = '2px';

    const SIZE_CLASSES = {
      small: classes.sizeSmall,
      medium: classes.sizeMedium,
      large: classes.sizeLarge
    };

    const rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: classNames({
        [classes.root]: true,
        [classes[this.props.use]]: true,
        [classes.active]: this.props.active,
        [classes.checked]: this.props.checked,
        [classes.disabled]: this.props.disabled || this.props.loading,
        [classes.narrow]: this.props.narrow,
        [classes.noPadding]: this.props._noPadding,
        [classes.noRightPadding]: this.props._noRightPadding,
        [classes.buttonWithIcon]: !!this.props.icon,
        [classes.arrowButton]: this.props.arrow,
        [SIZE_CLASSES[this.props.size]]: true,
        [classes.focus]: this.props.visuallyFocused
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
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
      tabIndex: this.props.disableFocus ? '-1' : '0'
    };
    if (this.props.align) {
      rootProps.style.textAlign = this.props.align;
    }

    const wrapProps = {
      className: this.props.arrow ? classes.wrap_arrow : classes.wrap,
      style: {
        width: undefined
      }
    };
    if (this.props.width) {
      wrapProps.style.width = this.props.width;
    }

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
          className={classNames(
            classes.arrow,
            this.props.loading ? classes.arrow_loading : '',
            this.props.error ? classes.arrow_error : '',
            this.props.warning ? classes.arrow_warning : ''
          )}
        />
      );
    }

    // Force disable all props and features, that cannot be use with Link
    if (this.props.use === 'link') {
      rootProps.className = classNames({
        [classes.root]: true,
        [classes.link]: true,
        [classes.disabled]: this.props.disabled,
        [classes.buttonWithIcon]: !!this.props.icon
      });
      Object.assign(wrapProps, {
        className: classes.wrap,
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
          <div className={classes.caption}>
            {icon}
            {this.props.children}
          </div>
          {error}
        </button>
      </span>
    );
  });

  _ref = node => {
    this._node = node;
  };
}

export default Button;
