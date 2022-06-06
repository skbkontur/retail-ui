import React from 'react';

import { Paging, PagingProps } from '../../components/Paging';

type PagingPlaygroundState = Pick<PagingProps, 'activePage'>;
export class PagingPlayground extends React.Component {
  public state: PagingPlaygroundState = {
    activePage: 1,
  };

  public render() {
    return <Paging activePage={this.state.activePage} onPageChange={this.handlePageChange} pagesCount={12} />;
  }

  private handlePageChange = (pageNumber: number) => {
    this.setState({ active: pageNumber });
  };
}
