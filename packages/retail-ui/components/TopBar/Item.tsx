import cn from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import CapIcon, { IconProps } from '../Icon/20px';

import styles from './TopBar.less';
import { createPropsGetter } from '../internal/createPropsGetter';

export interface ItemProps {
  _onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  _onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'];
  iconOnly?: boolean;
  minWidth?: string | number;
  use?: 'danger' | 'pay';
  tabIndex?: number;
}

class Item extends React.Component<ItemProps> {
  public static propTypes = {
    use: PropTypes.oneOf(['danger', 'pay'])
  };

  public static defaultProps = {
    className: ''
  };

  private getProps = createPropsGetter(Item.defaultProps);

  public render() {
    const {
      active,
      children,
      _onClick,
      _onKeyDown,
      iconOnly,
      icon,
      minWidth,
      use,
      ...rest
    } = this.props;

    const className: string = this.getProps().className;

    const classes = {
      [styles.item]: true,
      [styles.buttonActive]: active,
      [className]: true,
      [styles.iconOnly]: iconOnly
    };
    if (use) {
      const useClassName = ('use-' + use) as keyof typeof styles;
      classes[styles[useClassName]] = true;
    }

    return (
      <div
        {...rest}
        className={cn(classes)}
        onClick={_onClick}
        onKeyDown={_onKeyDown}
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
