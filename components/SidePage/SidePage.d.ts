import * as React from 'react';

export interface SidePageProps {
  children?: React.ReactNode;
  blockBackground?: boolean;
  disableClose?: boolean;
  ignoreBackgroundClick?: boolean;
  noClose?: boolean;
  width?: number;
  onClose?: () => void;
}

export interface SidePageState {
  stackPosition: number;
}

export interface SidePageHeaderProps {
  children?: React.ReactNode;
  close?: boolean;
}

export interface SidePageHeaderState {}

export interface SidePageBodyProps {
  children?: React.ReactNode;
}

export interface SidePageBodyState {}

export interface SidePageFooterProps {
  children?: React.ReactNode;
  panel?: boolean;
}

export interface SidePageFooterState {}

declare class SidePageHeader extends React.Component<
  SidePageHeaderProps,
  SidePageHeaderState
> {}

declare class SidePageBody extends React.Component<
  SidePageBodyProps,
  SidePageBodyState
> {}

declare class SidePageFooter extends React.Component<
  SidePageFooterProps,
  SidePageFooterState
> {}

export default class SidePage extends React.Component<
  SidePageProps,
  SidePageState
> {
  static Header: typeof SidePageHeader;
  static Body: typeof SidePageBody;
  static Footer: typeof SidePageFooter;
}
