import React from 'react';
import { action } from '@storybook/addon-actions';
import type { ComponentStory } from '@storybook/react';

import type { Meta, Story } from '../../../typings/stories';
import type { ItemComponentProps } from '../Paging';
import { Paging } from '../Paging';
import { emptyHandler } from '../../../lib/utils';
import type { PagingProps } from '..';
import { Gapped } from '../../Gapped';

const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
dignissimos labore expedita. Sapiente beatae eveniet sit, similique,
sunt corrupti deserunt ab eius nobis suscipit praesentium labore.
Distinctio hic asperiores consequatur?`;

interface GoToAbsensePageState {
  activePage: number;
}
class GoToAbsensePage extends React.Component {
  public state: GoToAbsensePageState = {
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
    return activePage <= 4 ? 7 : 8;
  };

  private _handlePageChange = (pageNumber: number) => {
    const pagesCount = this._getPagesCount(pageNumber);
    const activePage = Math.min(pageNumber, pagesCount);
    this.setState({ activePage });
  };
}

interface PagingWithStateProps extends Partial<PagingProps> {
  pagesCount: number;
}
interface PagingWithStateState {
  activePage: number;
}
class PagingWithState extends React.Component<PagingWithStateProps> {
  public state: PagingWithStateState = {
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

const CustomComponent = ({ children, pageNumber, active, ...rest }: ItemComponentProps) => {
  if (Paging.isForward(pageNumber)) {
    return (
      <a href={'#' + (getPageFromHash() + 1)} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={'#' + pageNumber} {...rest}>
      {children}
    </a>
  );
};

interface PagingWithCustomComponentProps {
  pagesCount: number;
}
interface PagingWithCustomComponentState {
  activePage: number;
}
class PagingWithCustomComponent extends React.Component<PagingWithCustomComponentProps> {
  public state: PagingWithCustomComponentState = {
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
  component: Paging,
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const GoToAbsensePageStory: Story = () => <GoToAbsensePage />;
GoToAbsensePageStory.storyName = 'GoToAbsensePage';

export const SimpleSamples = () => (
  <>
    <PagingWithState pagesCount={1} />
    <PagingWithState pagesCount={5} />
    <PagingWithState pagesCount={7} />
    <PagingWithState pagesCount={8} />
    <PagingWithState pagesCount={12} />
  </>
);
SimpleSamples.storyName = 'SimpleSamples';
SimpleSamples.parameters = { creevey: { skip: true } };

export const PagingWithCustomComponentStory = () => <PagingWithCustomComponent pagesCount={12} />;
PagingWithCustomComponentStory.storyName = 'PagingWithCustomComponent';
PagingWithCustomComponentStory.parameters = { creevey: { skip: true } };

export const PagingWithGlobalListener = () => <PagingWithState useGlobalListener pagesCount={12} />;
PagingWithGlobalListener.storyName = 'Paging with global listener';
PagingWithGlobalListener.parameters = { creevey: { skip: true } };

const Template: ComponentStory<typeof Paging> = (args) => {
  return <Paging {...args} />;
};

export const WithLongItems = Template.bind({});
WithLongItems.args = {
  activePage: 753000,
  pagesCount: 7530050,
};

export const DisabledPaging = () => {
  return <Paging onPageChange={emptyHandler} disabled activePage={1} pagesCount={8} />;
};
DisabledPaging.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome2022|chrome2022Dark)\b)/ },
  },
};

export const PagingDisabledForwardLink = () => {
  return <Paging onPageChange={emptyHandler} activePage={8} pagesCount={8} />;
};
PagingDisabledForwardLink.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome2022|chrome2022Dark)\b)/ },
  },
};

export const WithSizes: Story = () => {
  const [activePage, setActivePage] = React.useState(1);
  return (
    <Gapped vertical gap={16}>
      <Paging pagesCount={30} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'small'} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'medium'} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'large'} activePage={activePage} onPageChange={setActivePage} />
    </Gapped>
  );
};
WithSizes.storyName = 'WithSizes';

export const PlaygroundStory = () => <Playground />;
PlaygroundStory.storyName = 'Playground';
PlaygroundStory.parameters = { creevey: { skip: true } };

interface PlaygroundState {
  useGlobalListener: boolean;
}
class Playground extends React.Component {
  public state: PlaygroundState = {
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

export const SimpleStaticExamplesMobile: Story = () => {
  return (
    <Gapped vertical gap={8}>
      <Paging pagesCount={5} activePage={1} onPageChange={() => {}} />
      <Paging pagesCount={6} activePage={1} onPageChange={() => {}} />
      <Paging pagesCount={7} activePage={1} onPageChange={() => {}} />
      <Paging pagesCount={7} activePage={4} onPageChange={() => {}} />
      <Paging pagesCount={7} activePage={5} onPageChange={() => {}} />
      <Paging pagesCount={7} activePage={6} onPageChange={() => {}} />
      <Paging pagesCount={7} activePage={7} onPageChange={() => {}} />
      <Paging pagesCount={1} activePage={1} onPageChange={() => {}} />
    </Gapped>
  );
};
SimpleStaticExamplesMobile.storyName = 'Simple static examples mobile';
SimpleStaticExamplesMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

export const WithSizesMobile: Story = () => {
  const [activePage, setActivePage] = React.useState(1);
  return (
    <Gapped vertical gap={8}>
      <Paging pagesCount={30} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'small'} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'medium'} activePage={activePage} onPageChange={setActivePage} />
      <Paging pagesCount={30} size={'large'} activePage={activePage} onPageChange={setActivePage} />
    </Gapped>
  );
};
WithSizesMobile.storyName = 'With sizes mobile';
WithSizesMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
