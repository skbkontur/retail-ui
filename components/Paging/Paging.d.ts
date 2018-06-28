import * as React from 'react';

export interface ItemComponentProps {
  active: boolean;
  children?: React.ReactNode;
  className: string;
  onClick: boolean | (() => void);
  pageNumber: number | 'forward';
  tabIndex: number;
}

export type ItemComponent =
  | React.ComponentType<ItemComponentProps>
  | ((props: ItemComponentProps) => React.ReactNode)
  | string;

export interface PagingProps {
  activePage: number;
  component?: ItemComponent;
  forwardText?: string;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
  withoutNavigationHint?: boolean;
}

export type ItemType = number | '.' | 'forward';

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: ItemType;
}

export default class Paging extends React.Component<PagingProps, PagingState> {
  public static isForward(pageNumber: number | 'forward'): boolean;
}
