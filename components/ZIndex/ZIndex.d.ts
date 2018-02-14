import * as React from 'react';

export interface ZIndexProps {
  delta: number;
  render?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default class ZIndex extends React.Component<ZIndexProps> {}
