import * as React from 'react';
import { MenuItemIcon, MenuItemStyledComment, MenuItemStyledContainer } from './MenuItemView';

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps {
  _enableIconPadding?: boolean;
  alkoLink?: boolean;
  comment?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: React.ReactNode;

  /** @ignore */
  loose?: boolean;

  /** @ignore */
  state?: MenuItemState;
  target?: string;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);
}

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component<MenuItemProps> {
  public render() {
    const {
      alkoLink,
      comment,
      disabled,
      icon,
      loose,
      state,
      children,
      onClick,
      _enableIconPadding,
      ...rest
    } = this.props;

    const isHovered = state === 'hover' && !disabled;
    const isSelected = state === 'selected' && !disabled;

    return (
      <MenuItemStyledContainer
        onClick={this.handleClick}
        disabled={disabled}
        hover={isHovered}
        select={isSelected}
        loose={loose}
        alkoLink={alkoLink}
        withIcon={!!icon || _enableIconPadding}
        {...rest}
      >
        {icon && <MenuItemIcon>{icon}</MenuItemIcon>}
        {typeof children === 'function' ? children(state) : children}
        {comment && <MenuItemStyledComment hover={isHovered}>{comment}</MenuItemStyledComment>}
      </MenuItemStyledContainer>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event);
    }
  };
}
