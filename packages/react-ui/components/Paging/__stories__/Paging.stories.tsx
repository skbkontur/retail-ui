import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Paging } from '../Paging';

const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
dignissimos labore expedita. Sapiente beatae eveniet sit, similique,
sunt corrupti deserunt ab eius nobis suscipit praesentium labore.
Distinctio hic asperiores consequatur?`;

class GoToAbsensePage extends Component<{}, any> {
  public state = {
    activePage: 3,
  };

  public render() {
    const pagesCount = this._getPagesCount(this.state.activePage);
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Paging activePage={this.state.activePage} pagesCount={pagesCount} onPageChange={this._handlePageChange} />
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
    activePage: 1,
  };

  public render() {
    return (
      <div>
        <Paging
          activePage={this.state.activePage}
          pagesCount={this.props.pagesCount}
          useGlobalListener={this.props.useGlobalListener}
          onPageChange={this._handlePageChange}
        />
      </div>
    );
  }

  private _handlePageChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber }, () => action('page cahnged')(this.state.activePage));
  };
}

const getPageFromHash = () => +document.location.hash.slice(1);

const CustomComponent: React.SFC<any> = ({ active, pageNumber, ...props }) =>
  Paging.isForward(pageNumber) ? (
    <a href={'#' + (getPageFromHash() + 1)} {...props}>
      {pageNumber}
    </a>
  ) : (
    <a href={'#' + pageNumber} {...props}>
      {pageNumber}
    </a>
  );

class PagingWithCustomComponent extends Component<any, any> {
  public state = {
    activePage: 1,
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

storiesOf('Paging', module)
  .addDecorator(story => <div>{story()}</div>)
  .add('GoToAbsensePage', () => <GoToAbsensePage />)
  .add('SimpleSamples', () => (
    <>
      <PagingWithState pagesCount={1} />
      <PagingWithState pagesCount={7} />
      <PagingWithState pagesCount={8} />
      <PagingWithState pagesCount={12} />
    </>
  ))
  .add('PagingWithCustomComponent', () => <PagingWithCustomComponent pagesCount={12} />)
  .add('Paging with global listener', () => <PagingWithState useGlobalListener pagesCount={12} />)
  .add('Playground', () => <Playground />);

class Playground extends React.Component<{}, { useGlobalListener: boolean }> {
  public state = {
    useGlobalListener: true,
  };

  public render() {
    return (
      <div style={{ width: 400 }}>
        <p contentEditable style={{ padding: '10px 15px', border: '1px solid' }} />
        <p>{lorem}</p>
        <p>
          <input onKeyDown={this.log} onKeyUp={this.log} onKeyPress={this.log} {...this.props} />
        </p>
        <p>
          <input type="radio" defaultChecked name="Paging" />
          <input type="radio" name="Paging" />
          <input type="radio" name="Paging" />
          <input type="radio" name="Paging" />
          <input type="radio" name="Paging" />
        </p>
        <p>
          <label>
            <input type="checkbox" checked={this.state.useGlobalListener} onChange={this.handleChangeGlobalListener} />{' '}
            useGlobalListener: <strong>{this.state.useGlobalListener.toString()}</strong>
          </label>
        </p>
        <PagingWithState useGlobalListener={this.state.useGlobalListener} pagesCount={12} />
      </div>
    );
  }

  private handleChangeGlobalListener = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ useGlobalListener: event.target.checked });
  };

  private log = (event: React.KeyboardEvent<HTMLInputElement>) => {
    action(event.type)(event.key);
  };
}
