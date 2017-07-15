import * as React from 'react';

export interface ItemComponentProps {
  active: boolean;
  children?: React.ReactElement<any>;
  className: string;
  onClick: boolean | (() => void);
  pageNumber: number | 'forward';
  tabIndex: number;
}

export type ItemComponent =
  | React.Component<ItemComponentProps, any>
  | ((props: ItemComponentProps) => React.ReactElement<any>)
  | string;

export interface PagingProps {
  activePage: number;
  component?: ItemComponent;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
}

export type ItemType = number | '.' | 'forward';

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: ItemType;
}

export default class Paging extends React.Component<PagingProps, PagingState> {}
