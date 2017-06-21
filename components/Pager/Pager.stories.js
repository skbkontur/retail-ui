// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Pager, {PagerProps} from '../Pager';

class Component extends React.Component {
  constructor(props: PagerProps) {
    super(props);

    this.state = {
      currentPage: this.props.startPage || 1
    };
    this._handleChange = this._handleChange.bind(this);
  }  

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
  .add('5 pages, no tooltip', () => (
    <Component pagesCount={5} navTooltip={false} />
  )).add('30 pages', () => (
    <Component pagesCount={30} startPage={2} renderLabel={(pageNumber) => `стр. ${pageNumber}`} />
  ));