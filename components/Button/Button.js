// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Corners from './Corners';
import Icon from '../Icon';
import Upgrades from '../../lib/Upgrades';

import '../ensureOldIEClassName';
import styles from './Button.less';

const DEPRECATED_SIZE_CLASSES = {
  default: styles.deprecated_sizeDefault,
  small: styles.deprecated_sizeDefault, // for new default size
  large: styles.deprecated_sizeLarge,
};

const SIZE_CLASSES = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

type Props = {
  _noPadding?: bool,
  _noRightPadding?: bool,
  active?: bool,
  checked?: bool,
  children?: any,
  corners?: number, // internal
  disabled?: bool,
  focused?: bool,
  icon?: string,
  loading?: bool,
  narrow?: bool,
  size: 'small' | 'medium' | 'large',
  type: 'button' | 'submit' | 'reset',
  use: 'default' | 'primary' | 'success' | 'danger' | 'pay',
  width?: number | string,
  onClick?: (e: SyntheticMouseEvent) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
};

class Button extends React.Component {
  static TOP_LEFT = Corners.TOP_LEFT;
  static TOP_RIGHT = Corners.TOP_RIGHT;
  static BOTTOM_RIGHT = Corners.BOTTOM_RIGHT;
  static BOTTOM_LEFT = Corners.BOTTOM_LEFT;

  static propTypes = {
    /**
     * Визуально нажатое состояние.
     */
    active: PropTypes.bool,

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
    ]),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Click handler.
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    use: 'default',
    size: 'small',
    type: 'button',
  };

  props: Props;
  state: null;

  render() {
    const {corners = 0} = this.props;
    const radius = '2px';

    const rootProps: any = {
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
        ...this._getSizeClassMap(),
      }),
      style: {
        borderRadius: `${corners & Corners.TOP_LEFT ? 0 : radius}` +
          ` ${corners & Corners.TOP_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_LEFT ? 0 : radius}`,
      },
      disabled: this.props.disabled || this.props.loading,
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      onMouseDown: this._handleMouseDown, //to prevent focus on click
    };
    if (this.props.align) {
      rootProps.style.textAlign = this.props.align;
    }

    const wrapStyle = {};
    if (this.props.width) {
      wrapStyle.width = this.props.width;
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

    return (
      <span className={styles.wrap} style={wrapStyle}>
        <button {...rootProps}>
          {loading}
          <div className={styles.caption}>
            {icon}
            {this.props.children}
          </div>
          {error}
        </button>
      </span>
    );
  }

  _handleMouseDown(e) {
    document.activeElement.blur();
    e.preventDefault();
  }

  _getSizeClassMap() {
    if (!Upgrades.isHeight34Enabled()) {
      return {
        [DEPRECATED_SIZE_CLASSES[(this.props.size: any)]]: true,
      };
    }

    return {
      [SIZE_CLASSES[this.props.size]]: true,
    };
  }
}

export default Button;
