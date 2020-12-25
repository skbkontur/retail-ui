import React from 'react';
import cn from 'classnames';

import { IconProps } from '../../internal/icons/20px';
import { CommonProps } from '../../typings/common';

import { TopBarItem, TopBarItemProps } from './TopBarItem';
import { jsStyles } from './TopBar.styles';

export interface TopBarButtonItemProps extends CommonProps, TopBarItemProps {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps['name'] | React.ReactElement;
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
export class TopBarButtonItem extends React.Component<TopBarButtonItemProps> {
  public static defaultProps = {
    use: 'default',
  };
  public render() {
    const { onClick, children, onKeyDown, className, ...rest } = this.props;
    return (
      <TopBarItem {...rest} className={cn(className, jsStyles.button())} _onKeyDown={onKeyDown} _onClick={onClick}>
        {children}
      </TopBarItem>
    );
  }
}
