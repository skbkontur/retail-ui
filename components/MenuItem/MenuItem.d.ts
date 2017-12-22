import * as React from 'react';

export type MenuItemStateType = null | 'hover' | 'selected';

export interface MenuItemProps {
  _enableIconPadding?: boolean;
  alkoLink?: boolean;
  comment?: React.ReactNode;
  children?: React.ReactNode | ((state: MenuItemStateType) => React.ReactNode);
  disabled?: boolean;
  href?: string;
  icon?: string;
  loose?: boolean;
  state?: MenuItemStateType;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLLinkElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLinkElement>;
}

export interface MenuItemState {}

export default class MenuItem extends React.Component<
  MenuItemProps,
  MenuItemState
> {}
