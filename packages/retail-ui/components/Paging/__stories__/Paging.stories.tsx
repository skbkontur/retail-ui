
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Paging from '../Paging';

storiesOf('Paging', module).addDecorator(story => <div>{story()}</div>).add('GoToAbsensePage', () => <GoToAbsensePage />).add('SimpleSamples', () => {
    return (
      <div>
        <PagingWithState pagesCount={1} />
        <PagingWithState pagesCount={7} />
        <PagingWithState pagesCount={8} />
        <PagingWithState pagesCount={12} />
      </div>
    );
  }).add('PagingWithCustomComponent', () => (
    <PagingWithCustomComponent pagesCount={12} />
  ));

class GoToAbsensePage extends Component<{}, any> {
  public state = {
    activePage: 3
  };

  public render() {
    const pagesCount = this._getPagesCount(this.state.activePage);
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Paging
            activePage={this.state.activePage}
            pagesCount={pagesCount}
            onPageChange={this._handlePageChange}
          />
        </div>
      </div>
    );
  }

  private _getPagesCount = (activePage: number) => {
    return activePage <= 4 ? 7 : 5;
  };

  private _handlePageChange = (pageNumber: number) => {
    const pagesCount = this._getPagesCount(pageNumber);
    const activePage = Math.min(pageNumber, pagesCount);
    this.setState({ activePage });
  };
}

class PagingWithState extends Component<any, any> {
  public state = {
    activePage: 1
  };

  public render() {
    return (
      <div>
        <Paging
          activePage={this.state.activePage}
          pagesCount={this.props.pagesCount}
          onPageChange={this._handlePageChange}
        />
      </div>
    );
  }

  private _handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };
}

const getPageFromHash = () => +document.location.hash.slice(1);

const CustomComponent: React.SFC<any> = ({ active, pageNumber, ...props }) =>
  Paging.isForward(pageNumber) ? (
    <a href={'#' + (getPageFromHash() + 1)} {...props} />
  ) : (
    <a href={'#' + pageNumber} {...props} />
  );

class PagingWithCustomComponent extends Component<any, any> {
  public state = {
    activePage: 1
  };

  public componentDidMount() {
    document.location.hash = '#1';
    window.addEventListener('hashchange', this._handleHashChange);
  }

  public componentWillUnmount() {
    document.location.hash = '';
    window.removeEventListener('hashchange', this._handleHashChange);
  }

  public render() {
    return (
      <div>
        <Paging
          activePage={this.state.activePage}
          pagesCount={this.props.pagesCount}
          onPageChange={this._handlePageChange}
          component={CustomComponent}
        />
      </div>
    );
  }

  public _handlePageChange = (pageNumber: number) => {
    document.location.hash = '#' + pageNumber;
  };

  public _handleHashChange = () => {
    this.setState({ activePage: getPageFromHash() });
  };
}
