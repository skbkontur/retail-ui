import React, { Component } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { CSFStory } from 'creevey';

import { Paging } from '../Paging';
import { delay } from '../../../lib/utils';

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
      {props.children}
    </a>
  ) : (
    <a href={'#' + pageNumber} {...props}>
      {props.children}
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

export default {
  title: 'Paging',
  decorators: [(story: StoryFn<JSX.Element>) => <div>{story()}</div>],
};

export const GoToAbsensePageStory: CSFStory<JSX.Element> = () => <GoToAbsensePage />;
GoToAbsensePageStory.story = {
  name: 'GoToAbsensePage',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie118px'], tests: 'hover' }],
      tests: {
        async plain() {
          await this.expect(await this.takeScreenshot()).to.matchImage('plain');
        },
        async hover() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover');
        },
        async ['change page by number']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('change page by number');
        },
        async ['change page by forwardLink']() {
          // NOTE Firefox bug if click send right after click from previous test it results as double click
          await delay(500);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: `[data-tid='Paging__forwardLink']` }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('change page by forwardLink');
        },
        async focused() {
          // NOTE Firefox bug if click send right after click from previous test it results as double click
          await delay(500);
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('focused');
        },
        async ['Move focus right']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
            .pause(100)
            .sendKeys(this.keys.ARROW_RIGHT)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('Move focus right');
        },
        async ['Move to page by Ender']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: `[data-tid='Paging__pageLinkWrapper']` }))
            .pause(100)
            .sendKeys(this.keys.ARROW_RIGHT)
            .pause(100)
            .sendKeys(this.keys.ENTER)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('Move to page by Ender');
        },
      },
    },
  },
};

export const SimpleSamples = () => (
  <>
    <PagingWithState pagesCount={1} />
    <PagingWithState pagesCount={7} />
    <PagingWithState pagesCount={8} />
    <PagingWithState pagesCount={12} />
  </>
);
SimpleSamples.story = { name: 'SimpleSamples', parameters: { creevey: { skip: [true] } } };

export const PagingWithCustomComponentStory = () => <PagingWithCustomComponent pagesCount={12} />;
PagingWithCustomComponentStory.story = { name: 'PagingWithCustomComponent', parameters: { creevey: { skip: [true] } } };

export const PagingWithGlobalListener = () => <PagingWithState useGlobalListener pagesCount={12} />;
PagingWithGlobalListener.story = { name: 'Paging with global listener', parameters: { creevey: { skip: [true] } } };

export const PlaygroundStory = () => <Playground />;
PlaygroundStory.story = { name: 'Playground', parameters: { creevey: { skip: [true] } } };

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
