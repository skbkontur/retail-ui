/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const CssStyles = require('./Toggle.less');

let styles: typeof CssStyles;
styles = isFlatDesign
  ? require('./Toggle.flat.less')
  : require('./Toggle.less');

type Props = {
  checked: boolean,
  disabled?: boolean,
  onChange?: (value: boolean) => void,
  warning?: boolean,
  error?: boolean,
  loading?: boolean
};

class Toggle extends React.Component<Props> {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    loading: false
  };

  handleClick = () => {
    const { checked, disabled, onChange } = this.props;

    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  render() {
    const { checked, disabled, warning, error, loading } = this.props;

    const containerClassName = classNames(styles.container, {
      [styles.isChecked]: checked,
      [styles.isDisabled]: disabled,
      [styles.isDefault]: true,
      [styles.isWarning]: warning,
      [styles.isError]: error,
      [styles.isLoading]: loading
    });

    return (
      <span className={containerClassName} onClick={this.handleClick}>
        <span className={styles.bg__container}>
          <span className={styles.bg__wrap}>
            <span className={styles.bg__left} />
            <span className={styles.bg__right} />
          </span>
        </span>
        <span className={styles.handle} />
      </span>
    );
  }
}

export default Toggle;
