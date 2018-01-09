import * as React from 'react';

export interface LogoComponentProps {
  href: string;
  tabIndex: number;
  className: string;
}

export interface LogotypeProps {
  color?: string;
  component?: React.ComponentType<LogoComponentProps> | string;
  href?: string;
  suffix?: string;
  textColor?: string;
}

export interface LogotypeState {}

export default class Logotype extends React.Component<
  LogotypeProps,
  LogotypeState
> {}
