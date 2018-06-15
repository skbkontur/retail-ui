import * as React from 'react';

export interface MenuHeaderProps {
  children: React.ReactNode;
}

export interface MenuHeaderState {}

export default class MenuHeader extends React.Component<
  MenuHeaderProps,
  MenuHeaderState
> {}
