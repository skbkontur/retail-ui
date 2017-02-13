import classNames from 'classnames';
import React, { PropTypes } from 'react';

import styles from './Radio.less';

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
class Radio extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    warning: PropTypes.bool
  };

  static defaultProps = {
    checked: false,
    focused: false
  };

  render() {
    var rootClass = classNames({
      [styles.root]: true,
      [styles.checked]: this.props.checked,
      [styles.disabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.focused]: this.props.focused,
      [styles.warning]: this.props.warning
    });

    return (
      <span className={rootClass}><div className={styles.inbox} /></span>
    );
  }
}

module.exports = Radio;
