import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

import DefaultStyles = require('./Toggle.less');
import FlatStyles = require('./Toggle.flat.less');

const styles = isFlatDesign ? FlatStyles : DefaultStyles;

export interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  warning?: boolean;
  error?: boolean;
  loading?: boolean;
}

class Toggle extends React.Component<ToggleProps> {
  public static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func
  };

  public static defaultProps = {
    disabled: false,
    loading: false
  };

  public render() {
    const { checked, warning, error, loading } = this.props;
    const disabled = this.isDisabled();

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

  private handleClick = () => {
    const { checked, onChange } = this.props;
    const disabled = this.isDisabled();
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  private isDisabled() {
    return this.props.disabled || this.props.loading;
  }
}

export default Toggle;
