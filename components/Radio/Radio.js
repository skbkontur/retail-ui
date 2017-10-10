import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import '../ensureOldIEClassName';

import styles from './Radio.less';

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
class Radio extends React.Component {
  static defaultProps = {
    checked: false,
    focused: false
  };

  static PropTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    pressed: PropTypes.bool,
    warning: PropTypes.bool
  };

  render() {
    const radioClassNames = classNames({
      [styles.radio]: true,
      [styles.withLabel]: this.props.children,
      [styles.checked]: this.props.checked,
      [styles.disabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.focus]: this.props.focused,
      [styles.hovered]: this.props.hovered,
      [styles.pressed]: this.props.pressed,
      [styles.warning]: this.props.warning
    });

    return (
      <div className={styles.root}>
        <div className={this.props.children && [styles.radioWrap]}>
          <span className={radioClassNames} />
        </div>
        {this.props.children && this.renderLabel()}
      </div>
    );
  }

  renderLabel() {
    const labelClassNames = classNames({
      [styles.label]: true,
      [styles.labelDisabled]: this.props.disabled
    });

    return (
      <div className={labelClassNames}>
        {this.props.children}
      </div>
    );
  }
}

export default Radio;
