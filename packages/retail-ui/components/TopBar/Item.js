
import cn from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import CapIcon from '../Icon/20px';

import styles from './TopBar.less';

class Item extends React.Component<{
  _onClick?: (e: SyntheticMouseEvent<>) => void,
  active?: boolean,
  children?: React.Element<*> | string,
  className: string,
  icon?: string,
  iconOnly?: boolean,
  minWidth?: string | number,
  use?: 'danger' | 'pay'
}> {
  static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay'])
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const {
      active,
      children,
      _onClick,
      className,
      iconOnly,
      icon,
      minWidth,
      use,
      ...rest
    } = this.props;

    const classes = {
      [styles.item]: true,
      [styles.buttonActive]: active,
      [className]: true,
      [styles.iconOnly]: iconOnly
    };
    if (use) {
      classes[styles['use-' + use]] = true;
    }

    return (
      <div
        {...rest}
        className={cn(classes)}
        onClick={_onClick}
        style={{ minWidth }}
      >
        {icon && (
          <span className={styles.icon}>
            <CapIcon color="#666" name={icon} />
          </span>
        )}
        {children}
      </div>
    );
  }
}

export default Item;
