// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import SidePage from '../SidePage';
import Button from '../../Button';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Toggle from '../../Toggle';
import Modal from '../../Modal/Modal';
import Gapped from '../../Gapped/Gapped';
import { Shape } from '../../../typings/utility-types';

const textSample = (
  <p>
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the
    charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound
    to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as
    saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free
    hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best,
    every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of
    duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
    accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures
    to secure other greater pleasures, or else he endures pains to avoid worse pains.
  </p>
);

interface SampleProps {
  children?: React.ReactNode;
  total?: number;
  current?: number;
  ignoreBackgroundClick?: boolean;
  blockBackground?: boolean;
  withContent?: boolean;
}

interface SampleState {
  open: boolean;
  panel: boolean;
}

class Sample extends React.Component<SampleProps, SampleState> {
  public state: SampleState = {
    open: false,
    panel: false,
  };

  public open = () => this.setState({ open: true });
  public close = () => this.setState({ open: false });

  public renderSidePage = (): React.ReactNode => (
    <SidePage
      width={785}
      onClose={this.close}
      ignoreBackgroundClick={this.props.ignoreBackgroundClick}
      blockBackground={this.props.blockBackground}
    >
      <SidePage.Header>
        Title
        {this.props.total && this.props.total > 1 && ` ${this.props.current} / ${this.props.total}`}
      </SidePage.Header>
      <SidePage.Body>
        <div style={{ padding: '0 35px 35px 35px' }}>
          {this.props.total &&
            this.props.current &&
            this.props.total > this.props.current && (
              <Sample
                current={this.props.current + 1}
                total={this.props.total}
                ignoreBackgroundClick={this.props.ignoreBackgroundClick}
                withContent={this.props.withContent}
                blockBackground={this.props.blockBackground}
              />
            )}
          <div>
            <Toggle checked={this.state.panel} onChange={() => this.setState(({ panel }) => ({ panel: !panel }))} />{' '}
            Panel {this.state.panel ? 'enabled' : 'disabled'}
          </div>
          {this.props.children}
          {this.props.withContent && (
            <div>
              {textSample}
              {textSample}
            </div>
          )}
        </div>
      </SidePage.Body>
      <SidePage.Footer panel={this.state.panel}>
        <Button size="large" onClick={this.close}>
          Close
        </Button>
      </SidePage.Footer>
    </SidePage>
  );

  public render() {
    return (
      <div>
        {this.state.open && this.renderSidePage()}
        <Button onClick={this.open}>Open SidePage</Button>
      </div>
    );
  }
}

interface SampleConfiguratorProps {
  ignoreBackgroundClick: boolean;
  blockBackground: boolean;
  withContent: boolean;
  onChange: (name: string) => void;
}

class SampleConfigurator extends React.Component<SampleConfiguratorProps> {
  public render() {
    return (
      <div>
        <div>
          <Toggle
            checked={this.props.ignoreBackgroundClick}
            onChange={() => this.props.onChange('ignoreBackgroundClick')}
          />{' '}
          ignoreBackgroundClick {this.props.ignoreBackgroundClick ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle checked={this.props.blockBackground} onChange={() => this.props.onChange('blockBackground')} />{' '}
          blockBackground {this.props.blockBackground ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle checked={this.props.withContent} onChange={() => this.props.onChange('withContent')} /> withContent{' '}
          {this.props.withContent ? 'enabled' : 'disabled'}
        </div>
      </div>
    );
  }
}

class SidePageWithScrollableContent extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample total={1} current={1} ignoreBackgroundClick withContent />
        {textSample}
        {textSample}
      </div>
    );
  }
}

interface SidePageWithInputInHeaderState {
  opened: boolean;
}

class SidePageWithInputInHeader extends React.Component<{}, SidePageWithInputInHeaderState> {
  public state: SidePageWithInputInHeaderState = {
    opened: false,
  };

  public render() {
    const sidePage = (
      <SidePage onClose={this.close}>
        <SidePage.Header>
          <Input placeholder="Some input placeholder..." value="" />{' '}
          <Input size="large" placeholder="Some large input placeholder..." value="" />
          <br />
          <Textarea placeholder="Some textarea placeholder" value="" />
        </SidePage.Header>
        <SidePage.Body>
          <p style={{ marginLeft: 30 }}>Use rxjs operators with react hooks</p>
        </SidePage.Body>
      </SidePage>
    );

    return (
      <div style={{ width: '300px' }}>
        {this.state.opened && sidePage}
        <Button onClick={this.open}>Open side page</Button>
      </div>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };
}

class SidePageOverAnotherSidePage extends React.Component<{}> {
  public render() {
    return <Sample current={1} total={5} ignoreBackgroundClick blockBackground withContent />;
  }
}

interface SidePageWithCloseConfigurationState {
  ignoreBackgroundClick: boolean;
  blockBackground: boolean;
  withContent: boolean;
}

class SidePageWithCloseConfiguration extends React.Component<{}, SidePageWithCloseConfigurationState> {
  public state: SidePageWithCloseConfigurationState = {
    ignoreBackgroundClick: false,
    blockBackground: false,
    withContent: false,
  };

  public render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample
          total={1}
          current={1}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
          withContent={this.state.withContent}
        />
        <SampleConfigurator
          onChange={name => {
            const propertyName = name as keyof SidePageWithCloseConfigurationState;
            this.setState(
              (state: SidePageWithCloseConfigurationState) =>
                ({ [propertyName]: !state[propertyName] } as Shape<SidePageWithCloseConfigurationState>),
            );
          }}
          ignoreBackgroundClick={this.state.ignoreBackgroundClick}
          blockBackground={this.state.blockBackground}
          withContent={this.state.withContent}
        />
      </div>
    );
  }
}

interface SidePageWithModalInsideState {
  isModalOpened: boolean;
  ignoreBackgroundClick: boolean;
  blockBackground: boolean;
  withContent: boolean;
}

class SidePageWithModalInside extends React.Component<{}, SidePageWithModalInsideState> {
  public state: SidePageWithModalInsideState = {
    isModalOpened: false,
    ignoreBackgroundClick: true,
    blockBackground: false,
    withContent: false,
  };

  public render() {
    return (
      <div>
        {this.state.isModalOpened && this.renderModal()}
        <Sample current={1} ignoreBackgroundClick={false} blockBackground>
          <Button onClick={() => this.setState({ isModalOpened: true })}>Открыть modal</Button>
          <div>
            {textSample}
            {textSample}
          </div>
        </Sample>
        {textSample}
        {textSample}
      </div>
    );
  }

  private renderModal = () => (
    <Modal onClose={() => this.setState({ isModalOpened: false })} ignoreBackgroundClick>
      <Modal.Header>Хедер</Modal.Header>
    </Modal>
  );
}

class SidePageWithLeftPosition extends React.Component<{
  disableAnimations?: boolean;
  close: () => void;
}> {
  public render() {
    return (
      <SidePage disableAnimations={this.props.disableAnimations} fromLeft={true} onClose={this.props.close}>
        <SidePage.Header>test</SidePage.Header>
        <SidePage.Body>
          <SidePage.Container>
            {textSample}
            {textSample}
          </SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Gapped>
            <Button use="primary">Ok</Button>
            <Button onClick={this.props.close}>Cancel</Button>
          </Gapped>
        </SidePage.Footer>
      </SidePage>
    );
  }
}

class OpenSidePageWithLeftPosition extends React.Component<SampleProps, SampleState> {
  public state: SampleState = {
    open: false,
    panel: false,
  };

  public render() {
    return (
      <div>
        {this.state.open && <SidePageWithLeftPosition close={this.close} />}
        <Button onClick={this.open}>Open SidePage</Button>
      </div>
    );
  }

  private open = () => this.setState({ open: true });
  private close = () => this.setState({ open: false });
}

class SimpleSidePage extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={{ width: '300px' }}>
        <Sample total={1} current={1} ignoreBackgroundClick withContent />
      </div>
    );
  }
}

interface WithVariableContentState {
  opened: boolean;
  sidePageText: string[];
  pageText: string[];
}
class WithVariableContent extends React.Component<{}, WithVariableContentState> {
  public state: WithVariableContentState = {
    opened: false,
    sidePageText: [],
    pageText: [],
  };

  public render() {
    return (
      <div>
        {this.state.opened && this.renderSidePage()}
        {this.state.pageText.map(() => (
          <div style={{ height: '400px' }}>Use rxjs operators with react hooks</div>
        ))}
        <Button onClick={this.open}>Open</Button>
      </div>
    );
  }

  private renderSidePage = () => (
    <SidePage onClose={this.close} blockBackground>
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <div
          style={{
            background: `repeating-linear-gradient(
                          60deg,
                          #fafafa,
                          #fafafa 20px,
                          #dfdede 20px,
                          #dfdede 40px
                        )`,
            height: 600,
            padding: '20px 0',
          }}
        >
          <SidePage.Container>
            <p>Use rxjs operators with react hooks</p>
            {this.state.sidePageText.map((_item, index) => (
              <div key={index} style={{ height: '400px' }}>
                Use rxjs operators with react hooks
              </div>
            ))}
          </SidePage.Container>
        </div>
      </SidePage.Body>
      <SidePage.Footer panel>
        <Button onClick={this.hendleAddSidePageClick}>Add sidePageText</Button>
        <Button onClick={this.handleAddPageClick}>Add pageText</Button>
      </SidePage.Footer>
    </SidePage>
  );

  private hendleAddSidePageClick = () => {
    this.setState(state => ({ sidePageText: [...state.sidePageText, 'text'] }));
  };

  private handleAddPageClick = () => {
    this.setState(state => ({ pageText: [...state.pageText, 'text'] }));
  };

  private open = () => {
    this.setState({ opened: true });
  };

  private close = () => {
    this.setState({ opened: false });
  };
}

class TestUpdateLayoutMethod extends React.Component {
  public static ChildComp = class extends React.Component {
    public state = {
      content: false,
    };

    public toggleContent = () => {
      this.setState({ content: !this.state.content });
    };

    public render() {
      return <div>{this.state.content && <TestUpdateLayoutMethod.Content />}</div>;
    }
  };

  public static Content = () => (
    <div
      style={{
        background: `repeating-linear-gradient(
                          60deg,
                          #fafafa,
                          #fafafa 20px,
                          #dfdede 20px,
                          #dfdede 40px
                        )`,
        height: 2000,
      }}
    />
  );

  public state = {
    content: false,
  };

  private sidePage: SidePage | null = null;
  // @ts-ignore: only refers to a type, but is being used as a namespace here
  private childComp: TestUpdateLayoutMethod.ChildComp | null = null;

  public updateLayout = () => {
    if (this.sidePage) {
      this.sidePage.updateLayout();
    }
  };

  public toggleBodyContent = () => {
    this.setState({ content: !this.state.content });
  };

  public toggleChildContent = () => {
    if (this.childComp) {
      this.childComp.toggleContent();
    }
  };

  public render() {
    return (
      <SidePage blockBackground ref={ref => (this.sidePage = ref)}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <SidePage.Container>
            {this.state.content && <TestUpdateLayoutMethod.Content />}
            <TestUpdateLayoutMethod.ChildComp ref={ref => (this.childComp = ref)} />
          </SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer>
          <div id="buttons">
            <Gapped gap={10}>
              <button id="toggle-body-content" onClick={this.toggleBodyContent}>
                Toggle Body Content
              </button>
              <button id="toggle-child-component-content" onClick={this.toggleChildContent}>
                Toggle Child Component Content
              </button>
              <button id="update" onClick={this.updateLayout}>
                Update
              </button>
            </Gapped>
          </div>
        </SidePage.Footer>
      </SidePage>
    );
  }
}

class WithLongTitle extends React.Component {
  public state = {
    title: `On the other hand, we denounce with righteous indignation and dislike,
          who are so beguiled and demoralized by the charms of pleasure of the
          moment.`
  };

  public render() {
    const { title } = this.state;
    return (
      <SidePage>
        <SidePage.Header>{title}</SidePage.Header>
        <SidePage.Body>
          <div
            id="scrollable-content"
            style={{
              height: 1500,
              background: `repeating-linear-gradient(
                      60deg,
                      #fafafa,
                      #fafafa 20px,
                      #dfdede 20px,
                      #dfdede 40px
                    )`
            }}
          />
        </SidePage.Body>
        <SidePage.Footer>
          <Gapped gap={15}>
            <button
              onClick={() =>
                this.setState({
                  title: title + title
                })
              }
            >
              Increase Title
            </button>
            <button
              onClick={() =>
                this.setState({
                  title: title.slice(title.length / 2)
                })
              }
            >
              Decrease Title
            </button>
          </Gapped>
        </SidePage.Footer>
      </SidePage>
    );
  }
}

storiesOf('SidePage', module)
  .add('With scrollable parent content', () => <SidePageWithScrollableContent />)
  .add('With Input in header', () => <SidePageWithInputInHeader />)
  .add('SidePage over another SidePage', () => <SidePageOverAnotherSidePage />)
  .add('SidePage with configuration', () => <SidePageWithCloseConfiguration />)
  .add('SidePage with Modal', () => <SidePageWithModalInside />)
  .add('Disabled SidePage', () => (
    <SidePage disableClose>
      <SidePage.Header>Disabled</SidePage.Header>
      <SidePage.Body>Content of disabled body</SidePage.Body>
    </SidePage>
  ))
  .add('SidePage with left position', () => <SidePageWithLeftPosition close={() => undefined} disableAnimations />)
  .add('Open SidePage with left position', () => <OpenSidePageWithLeftPosition />)
  .add('Simple', () => <SimpleSidePage />)
  .add('SidePage with variable content', () => <WithVariableContent />)
  .add('test updateLayout method', () => <TestUpdateLayoutMethod />)
  .add('With scrollable parent content and scrolling before open', () => (
    <div style={{ width: '300px' }}>
      {textSample}
      {textSample}
      {textSample}
      {textSample}
      <Sample total={1} current={1} ignoreBackgroundClick withContent />
      {textSample}
      {textSample}
    </div>
  ))
  .add('With long title', () => <WithLongTitle />);
