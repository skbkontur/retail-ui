import classNames from 'classnames';
import React, {PropTypes} from 'react';

import styles from './Radio.less';

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
var Radio = React.createClass({
  propTypes: {
    checked: PropTypes.bool,

    focused: PropTypes.bool,
  },

  render() {
    var rootClass = classNames({
      [styles.root]: true,
      [styles.checked]: this.props.checked,
      [styles.focused]: this.props.focused,
    });

    return (
      <span className={rootClass}><div className={styles.inbox} /></span>
    );
  },

  getDefaultProps() {
    return {
      checked: false,
      focused: false,
    };
  },
});

module.exports = Radio;
