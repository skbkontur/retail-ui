import React from 'react';

import { Paging } from '../../components/Paging';

export class PagingPlayground extends React.Component<{}, { active: number }> {
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
