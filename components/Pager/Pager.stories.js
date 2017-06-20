// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Pager, {PagerProps} from '../Pager';

class Component extends React.Component {
  constructor(props: PagerProps) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }
  state = {
    currentPage: 1
  };

  _handleChange(e: any) {
    this.setState({currentPage: e.target.value});
  }

  render() {
    return (
      <div>
        <Pager
          currentPage={this.state.currentPage}
          onPageChange={this._handleChange}
          {...this.props}
        />
        Текущая страница: {this.state.currentPage}
      </div>
    );
  }
}

storiesOf('Pager', module)
  .add('5 pages', () => (
    <Component pagesCount={5} />
  )).add('30 pages', () => (
    <Component pagesCount={30} />
  ));