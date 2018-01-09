import * as React from 'react';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CenterState {}

export default class Center extends React.Component<CenterProps, CenterState> {}
