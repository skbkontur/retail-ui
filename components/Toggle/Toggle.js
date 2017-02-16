/* @flow */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Toggle.less';

type Props = {
  checked: bool,
  disabled?: bool,
  onChange?: (value: bool) => void,
};

class Toggle extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    disabled: false
  };

  props: Props;

  handleClick = () => {
    const { checked, disabled, onChange } = this.props;

    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  render() {
    const { checked, disabled } = this.props;

    const containerClassName = classNames(styles.container, {
      [styles.isChecked]: checked,
      [styles.isDisabled]: disabled
    });

    return (
      <span className={containerClassName} onClick={this.handleClick}>
        <span className={styles.handle}>
          <div className={styles.bg} />
          <span className={styles.hinge} />
        </span>
      </span>
    );
  }
}

export default Toggle;
