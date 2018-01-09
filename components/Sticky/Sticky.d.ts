import * as React from 'react';

export interface StickyProps {
  side: 'top' | 'bottom';
  offset?: number;
  getStop?: () => HTMLElement | void;
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface StickyState {
  fixed: boolean;
  height: number;
  left: number | string;
  width: number | string;
  stopped: boolean;
  relativeTop: number;
}

export default class Sticky extends React.Component<StickyProps, StickyState> {}
