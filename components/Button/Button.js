import classNames from 'classnames';
import React, {PropTypes} from 'react';

import '../ensureOldIEClassName';
import styles from './Button.less';

class Button extends React.Component {
  static propTypes = {
    /**
     * Визуально нажатое состояние.
     */
    active: PropTypes.bool,

    disabled: PropTypes.bool,

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

    narrow: PropTypes.bool,

    size: PropTypes.oneOf(['default', 'large']),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Click handler.
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    use: 'default',
    size: 'default',
    type: 'button',
  };

  render() {
    var rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: classNames({
        [styles.root]: true,
        [styles['use-' + this.props.use]]: true,
        [styles.active]: this.props.active,
        [styles.disabled]: this.props.disabled,
        [styles.narrow]: this.props.narrow,
        [styles.sizeLarge]: this.props.size === 'large',
      }),
      style: {},
      disabled: this.props.disabled,
      onClick: this.props.onClick,
    };
    if (this.props.width) {
      rootProps.style.width = this.props.width;
    }

    return (
      <button {...rootProps}>{this.props.children}</button>
    );
  }
}

export default Button;
