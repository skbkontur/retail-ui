// @flow
import classNames from 'classnames';
import * as React from 'react';

import PropTypes from 'prop-types';

import Icon from '../Icon';

import '../ensureFocusRingPolyfill';

import styles from './Link.less';

const useClasses = {
  default: styles.useDefault,
  success: styles.useSuccess,
  danger: styles.useDanger,
  grayed: styles.useGrayed
};

type Props = {
  disabled?: boolean,
  href?: string,
  icon?: string,
  onClick?: (event: SyntheticMouseEvent<HTMLLinkElement>) => void,
  use?: 'default' | 'success' | 'danger' | 'grayed',
  children?: React.Node,
  _button?: boolean,
  _buttonOpened?: boolean,
  tabIndex?: number
};

/**
 * Стандартная ссылка.
 * Все свойства передаются в элемент *<a>*.
 */
class Link extends React.Component<Props> {
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
        <span className={styles.icon}>
          <Icon name={iconName} />
        </span>
      );
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow} />;
    }

    const props = {
      className: classNames(
        {
          [styles.root]: true,
          [styles.disabled]: disabled,
          [styles.button]: _button,
          [styles.buttonOpened]: _buttonOpened
        },
        use && useClasses[use]
      ),
      href,
      onClick: this._handleClick,
      tabIndex: this.props.tabIndex
    };
    if (disabled) {
      props.tabIndex = -1;
    }

    return (
      <a {...rest} {...props}>
        {icon}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  _handleClick = event => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };
}

export default Link;
