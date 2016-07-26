import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Icon from '../Icon';

import styles from './Link.less';

const useClasses = {
  default: styles.useDefault,
  success: styles.useSuccess,
  danger: styles.useDanger,
  grayed: styles.useGrayed,
};

/**
 * Стандартная ссылка.
 *
 * Все свойства передаются в элемент *<a>*.
 */
class Link extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.string,

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  static defaultProps = {
    href: 'javascript:',
    use: 'default',
  };

  render() {
    let icon = null;
    if (this.props.icon) {
      icon = (
        <span className={styles.icon}><Icon name={this.props.icon} /></span>
      );
    }

    let arrow = null;
    if (this.props._button) {
      arrow = <span className={styles.arrow} />;
    }

    const props = {
      className: classNames({
        [styles.root]: true,
        [useClasses[this.props.use]]: true,
        [styles.disabled]: this.props.disabled,
        [styles.button]: this.props._button,
        [styles.buttonOpened]: this.props._buttonOpened,
      }),
      href: this.props.href,
      onClick: this._handleClick,
    };
    if (this.props.disabled) {
      props.tabIndex = '-1';
    }

    return (
      <a {...this.props} {...props}>
        {icon}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  _handleClick = event => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick.call(null, event);
    }
  };
}

export default Link;
