import * as React from 'react';

import { IconProps } from '../internal/icons/20px';

import { Item, ItemProps } from './TopBarItem';
import styles from './TopBar.module.less';

export interface ButtonItemProps extends ItemProps {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'];
  iconOnly?: boolean;
  minWidth?: string | number;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  use: 'danger' | 'pay' | 'default';
}
/**
 * Интерактивный элемент топбара
 *
 * @visibleName TopBar.ButtonItem
 */
export class ButtonItem extends React.Component<ButtonItemProps> {
  public static defaultProps = {
    use: 'default',
  };
  public render() {
    const { onClick, children, onKeyDown, ...rest } = this.props;
    return (
      <Item {...rest} className={styles.button} _onKeyDown={onKeyDown} _onClick={onClick}>
        {children}
      </Item>
    );
  }
}
