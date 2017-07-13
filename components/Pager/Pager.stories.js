// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Pager, {PagerProps} from '../Pager';

class Component extends React.Component {
  state = {
    currentPage: this.props.startPage || 1
  }

  _handleChange(e: any) {
    this.setState({currentPage: e.target.value});
  }

  render() {
    return (
      <div>
        <Pager
          currentPage={this.state.currentPage}
          onPageChange={e => this._handleChange(e)}
          {...this.props}
        />
        Текущая страница: {this.state.currentPage}
      </div>
    );
  }
}

storiesOf('Pager', module)
  .add('5 pages, no tooltip', () => (
    <Component pagesCount={5} navTooltip={false} />
  )).add('30 pages, custom label', () => (
    <Component pagesCount={30} startPage={2} renderLabel={(pageNumber) => `стр. ${pageNumber}`} />
  ));