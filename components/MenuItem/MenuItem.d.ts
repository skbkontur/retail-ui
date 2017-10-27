import * as React from 'react';

export type MenuItemStateType = null | 'hover' | 'selected';

export interface MenuItemProps {
  _enableIconPadding?: boolean;
  alkoLink?: boolean;
  comment?: React.ReactElement<any> | string;
  disabled?: boolean;
  href?: string;
  icon?: string;
  loose?: boolean;
  state?: MenuItemStateType;
  target?: string;
  onClick?: React.MouseEventHandler<any>;
  onMouseDown?: React.MouseEventHandler<any>;
}

export interface MenuItemState {}

export default class MenuItem extends React.Component<
  MenuItemProps,
  MenuItemState
> {}
