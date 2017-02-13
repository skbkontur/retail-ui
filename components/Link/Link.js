// @flow
import classNames from 'classnames';
import React, { PropTypes } from 'react';

import Icon from '../Icon';
import browser from '../../lib/browserNormalizer';

import styles from './Link.less';

const useClasses = {
  default: styles.useDefault,
  success: styles.useSuccess,
  danger: styles.useDanger,
  grayed: styles.useGrayed
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

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed'])
  };

  static defaultProps = {
    href: 'javascript:',
    use: 'default'
  };

  render() {
    const {
      disabled,
      href,
      icon: iconName,
      use,
      _button,
      _buttonOpened,
      ...rest
    } = this.props;

    let icon = null;
    if (iconName) {
      icon = (
        <span className={styles.icon}><Icon name={iconName} /></span>
      );
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow} />;
    }

    const props: Object = {
      className: classNames({
        [styles.root]: true,
        [useClasses[use]]: true,
        [styles.disabled]: disabled,
        [styles.button]: _button,
        [styles.buttonOpened]: _buttonOpened
      }),
      href,
      onClick: this._handleClick,
      onMouseDown: this._handleMouseDown //to prevent focus on click
    };
    if (disabled) {
      props.tabIndex = '-1';
    }

    return (
      <a {...rest} {...props}>
        {icon}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  _handleMouseDown(e) {
    if (browser.hasFocusOnLinkClick && document.activeElement) {
      document.activeElement.blur();
      e.preventDefault();
    }
  }

  _handleClick = event => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick.call(null, event);
    }
  };
}

export default Link;
