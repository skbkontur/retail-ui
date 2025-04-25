import React from 'react';
import { Paging } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Paging',
  component: Paging,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  class Paginator3000 extends React.Component {
    constructor() {
      super();
      this.state = { active: 1 };
      this._handlePageChange = this._handlePageChange.bind(this);
    }

    render() {
      return <Paging activePage={this.state.active} onPageChange={this._handlePageChange} pagesCount={12} />;
    }

    _handlePageChange(pageNumber) {
      this.setState({ active: pageNumber });
    }
  }

  return <Paginator3000 />;
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  const [activePage, setActivePage] = React.useState(3);

  return (
    <Paging disabled onPageChange={(activePage) => setActivePage(activePage)} activePage={activePage} pagesCount={8} />
  );
};
Example2.storyName = 'Пейджинг в отключенном состоянии';
