import * as React from 'react';

export interface ScrollContainerProps {
  invert?: boolean;
  maxHeight?: number| string;
  preventWindowScroll?: boolean;
}

export interface ScrollContainerState {}

export default class ScrollContainerGroup extends React.Component<
  ScrollContainerProps,
  ScrollContainerState
> {
  scrollTo(el: HTMLElement): void;
}
