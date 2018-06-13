import * as React from 'react';

export interface TopBarButtonProps {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  iconOnly?: boolean;
  minWidth?: string | number;
  onClick?: () => void;
  use?: 'danger' | 'pay';
}

export interface TopBarButtonState {}

export default class TopBarButton extends React.Component<
  TopBarButtonProps,
  TopBarButtonState
> {}
