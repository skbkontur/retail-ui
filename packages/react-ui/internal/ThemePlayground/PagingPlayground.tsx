import React from 'react';

import { Paging } from '../../components/Paging';

type PagingPlaygroundState = { active: number };

export class PagingPlayground extends React.Component<unknown, PagingPlaygroundState> {
  public state = {
    active: 1,
  };

  public render() {
    return <Paging activePage={this.state.active} onPageChange={this.handlePageChange} pagesCount={12} />;
  }

  private handlePageChange = (pageNumber: number) => {
    this.setState({ active: pageNumber });
  };
}
