import * as React from 'react';

export = RetailUI;

declare namespace RetailUI {
  interface PagingProps {}

  interface PagingState {}

  class Paging extends React.Component<PagingProps, PagingState> {}
}
