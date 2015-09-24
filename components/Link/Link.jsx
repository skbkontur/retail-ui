import React, {PropTypes} from 'react';

import '../ensureOldIEClassName';
import styles from './Link.less';

/**
 * Стандартная ссылка.
 *
 * Все свойства передаются в элемент *<a>*.
 */
const Link = React.createClass({
  propTypes: {
    href: PropTypes.string,

    disabled: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      href: 'javascript:',
    };
  },

  render() {
    var props = {
      className: styles.root,
      href: this.props.href,
    };
    if (this.props.disabled) {
      props.className += ' ' + styles.disabled;
      props.tabIndex = '-1';
    }
    return <a {...this.props} {...props}>{this.props.children}</a>;
  },
});

module.exports = Link;
