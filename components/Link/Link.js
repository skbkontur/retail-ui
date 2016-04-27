import React, {PropTypes} from 'react';

import Icon from '../Icon';

import styles from './Link.less';

/**
 * Стандартная ссылка.
 *
 * Все свойства передаются в элемент *<a>*.
 */
class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string,

    disabled: PropTypes.bool,

    icon: PropTypes.string,
  };

  static defaultProps = {
    href: 'javascript:',
  };

  render() {
    let icon = null;
    if (this.props.icon) {
      icon = (
        <span className={styles.icon}><Icon name={this.props.icon} /></span>
      );
    }

    var props = {
      className: styles.root,
      href: this.props.href,
    };
    if (this.props.disabled) {
      props.className += ' ' + styles.disabled;
      props.tabIndex = '-1';
    }
    return <a {...this.props} {...props}>{icon}{this.props.children}</a>;
  }
}

export default Link;
