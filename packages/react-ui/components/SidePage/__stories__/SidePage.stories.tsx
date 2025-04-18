import React, { useCallback, useState } from 'react';

import { Story } from '../../../typings/stories';
import { SidePage } from '../SidePage';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Toggle } from '../../Toggle';
import { Modal } from '../../Modal';
import { Gapped } from '../../Gapped';
import { Shape } from '../../../typings/utility-types';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

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

const linearLightGradient = `repeating-linear-gradient(
                                60deg,
                                #fafafa,
                                #fafafa 20px,
                                #dfdede 20px,
                                #dfdede 40px
                              )`;
const linearDarkGradient = `repeating-linear-gradient(
                                60deg,
                                #868b8e,
                                #868b8e 20px,
                                #444 20px,
                                #444 40px
                              )`;

interface SampleProps {
  children?: React.ReactNode;
  total?: number;
  current?: number;
  withContent?: boolean;
  withLongBody?: boolean;
  withoutFooter?: boolean;
  withoutHeader?: boolean;
  ignoreBackgroundClick?: boolean;
  blockBackground?: boolean;
}

interface SampleState {
  open: boolean;
  panel: boolean;
}

class Sample extends React.Component<SampleProps> {
  public state: SampleState = {
    open: false,
    panel: false,
  };

  public open = () => this.setState({ open: true });
  public close = () => this.setState({ open: false });

  public renderSidePage = (): React.ReactNode => (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <SidePage
            width={785}
            onClose={this.close}
            ignoreBackgroundClick={this.props.ignoreBackgroundClick}
            blockBackground={this.props.blockBackground}
          >
            {!this.props.withoutHeader && (
              <SidePage.Header>
                Title
                {this.props.total && this.props.total > 1 && ` ${this.props.current} / ${this.props.total}`}
              </SidePage.Header>
            )}
            <SidePage.Body>
              <div style={{ padding: '0 35px 35px 35px' }}>
                {this.props.total && this.props.current && this.props.total > this.props.current && (
                  <Sample
                    current={this.props.current + 1}
                    total={this.props.total}
                    ignoreBackgroundClick={this.props.ignoreBackgroundClick}
                    withContent={this.props.withContent}
                    blockBackground={this.props.blockBackground}
                  />
                )}
                <div>
                  <Toggle
                    checked={this.state.panel}
                    onValueChange={() => this.setState(({ panel }: SampleState) => ({ panel: !panel }))}
                  />{' '}
                  Panel {this.state.panel ? 'enabled' : 'disabled'}
                </div>
                {this.props.children}
                {this.props.withContent && (
                  <div
                    style={
                      this.props.withLongBody
                        ? {
                            background: theme.prototype.constructor.name.includes('Dark')
                              ? '' + linearDarkGradient + ''
                              : '' + linearLightGradient + '',
                            height: 2000,
                          }
                        : undefined
                    }
                  >
                    {textSample}
                    {textSample}
                  </div>
                )}
              </div>
            </SidePage.Body>
            {!this.props.withoutFooter && (
              <SidePage.Footer panel={this.state.panel}>
                <Button size="large" onClick={this.close}>
                  Close
                </Button>
              </SidePage.Footer>
            )}
          </SidePage>
        );
      }}
    </ThemeContext.Consumer>
  );

  public render() {
    return (
      <div>
        {this.state.open && this.renderSidePage()}
        <Button onClick={this.open} data-tid="open-side-page">
          Open SidePage
        </Button>
      </div>
    );
  }
}

type SampleConfiguratorProps = {
  onChange: (name: string) => void;
} & SampleProps;

class SampleConfigurator extends React.Component<SampleConfiguratorProps> {
  public render() {
    return (
      <div>
        <div>
          <Toggle
            checked={this.props.ignoreBackgroundClick}
            onValueChange={() => this.props.onChange('ignoreBackgroundClick')}
          />{' '}
          ignoreBackgroundClick {this.props.ignoreBackgroundClick ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle checked={this.props.blockBackground} onValueChange={() => this.props.onChange('blockBackground')} />{' '}
          blockBackground {this.props.blockBackground ? 'enabled' : 'disabled'}
        </div>
        <div>
          <Toggle checked={this.props.withContent} onValueChange={() => this.props.onChange('withContent')} />{' '}
          withContent {this.props.withContent ? 'enabled' : 'disabled'}
        </div>
      </div>
    );
  }
}

class SidePageWithScrollableContent extends React.Component {
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

class SidePageWithInputInHeader extends React.Component {
  public state = {
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

class SidePageOverAnotherSidePage extends React.Component {
  public render() {
    return <Sample current={1} total={5} ignoreBackgroundClick blockBackground withContent />;
  }
}

class StickySidePageHeaderWhenAnotherSidePage extends React.Component {
  public render() {
    return <Sample current={1} total={2} ignoreBackgroundClick blockBackground withContent withLongBody />;
  }
}

interface SidePageWithCloseConfigurationState {
  ignoreBackgroundClick: boolean;
  blockBackground: boolean;
  withContent: boolean;
}

class SidePageWithCloseConfiguration extends React.Component {
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
          onChange={(name) => {
            const propertyName = name as keyof SidePageWithCloseConfigurationState;
            this.setState(
              (state: SidePageWithCloseConfigurationState) =>
                ({ [propertyName]: !state[propertyName] }) as Shape<SidePageWithCloseConfigurationState>,
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

class SidePageWithModalInside extends React.Component {
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

interface SidePageWithLeftPositionProps {
  close: () => void;
  disableAnimations: boolean;
}
class SidePageWithLeftPosition extends React.Component<SidePageWithLeftPositionProps> {
  public render() {
    return (
      <SidePage disableAnimations={this.props.disableAnimations} fromLeft onClose={this.props.close}>
        <SidePage.Header>test</SidePage.Header>
        <SidePage.Body>
          <SidePage.Container>
            {textSample}
            {textSample}
          </SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer gap={8} panel>
          <Button use="primary">Ok</Button>
          <Button onClick={this.props.close}>Cancel</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }
}

interface LeftSidePageWithRightSidePageProps {
  disableAnimations: boolean;
}
class LeftSidePageWithRightSidePage extends React.Component<LeftSidePageWithRightSidePageProps> {
  public render() {
    return (
      <>
        <SidePage disableAnimations={this.props.disableAnimations} fromLeft>
          <SidePage.Header>test</SidePage.Header>
          <SidePage.Body>
            <SidePage.Container>
              {textSample}
              {textSample}
            </SidePage.Container>
          </SidePage.Body>
          <SidePage.Footer gap={8} panel>
            <Button use="primary">Ok</Button>
            <Button>Cancel</Button>
          </SidePage.Footer>
        </SidePage>
        <SidePage disableAnimations={this.props.disableAnimations} fromLeft={false}>
          <SidePage.Header>test</SidePage.Header>
          <SidePage.Body>
            <SidePage.Container>
              {textSample}
              {textSample}
            </SidePage.Container>
          </SidePage.Body>
          <SidePage.Footer gap={8} panel>
            <Button use="primary">Ok</Button>
            <Button>Cancel</Button>
          </SidePage.Footer>
        </SidePage>
      </>
    );
  }
}

class SimpleSidePage extends React.Component {
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
class WithVariableContent extends React.Component {
  public state: WithVariableContentState = {
    opened: false,
    sidePageText: [],
    pageText: [],
  };

  public render() {
    return (
      <div>
        {this.state.opened && this.renderSidePage()}
        {this.state.pageText.map((t, i) => (
          <div key={i} style={{ height: '400px' }}>
            Use rxjs operators with react hooks
          </div>
        ))}
        <Button onClick={this.open} data-tid="open-side-page">
          Open
        </Button>
      </div>
    );
  }

  private renderSidePage = () => (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <SidePage onClose={this.close} blockBackground>
            <SidePage.Header>Title</SidePage.Header>
            <SidePage.Body>
              <div
                style={{
                  background: theme.prototype.constructor.name.includes('Dark')
                    ? '' + linearDarkGradient + ''
                    : '' + linearLightGradient + '',
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
      }}
    </ThemeContext.Consumer>
  );

  private hendleAddSidePageClick = () => {
    this.setState((state: WithVariableContentState) => ({ sidePageText: [...state.sidePageText, 'text'] }));
  };

  private handleAddPageClick = () => {
    this.setState((state: WithVariableContentState) => ({ pageText: [...state.pageText, 'text'] }));
  };

  private open = () => {
    this.setState({ opened: true });
  };

  private close = () => {
    this.setState({ opened: false });
  };
}

class TestUpdateLayoutMethod extends React.Component {
  public static ChildComp = class ChildComp extends React.Component {
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
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <div
            style={{
              background: theme.prototype.constructor.name.includes('Dark')
                ? '' + linearDarkGradient + ''
                : '' + linearLightGradient + '',
              height: 2000,
            }}
          />
        );
      }}
    </ThemeContext.Consumer>
  );

  public state = {
    content: false,
  };

  private sidePage: SidePage | null = null;
  // @ts-expect-error: Only refers to a type, but is being used as a namespace here.
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
      <SidePage blockBackground ref={(ref) => (this.sidePage = ref)}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <SidePage.Container>
            {this.state.content && <TestUpdateLayoutMethod.Content />}
            <TestUpdateLayoutMethod.ChildComp ref={(ref) => (this.childComp = ref)} />
          </SidePage.Container>
        </SidePage.Body>
        <SidePage.Footer>
          <div id="buttons">
            <Gapped gap={10}>
              <Button data-tid="toggle-body-content" onClick={this.toggleBodyContent}>
                Toggle Body Content
              </Button>
              <Button data-tid="toggle-child-component-content" onClick={this.toggleChildContent}>
                Toggle Child Component Content
              </Button>
              <Button data-tid="update" onClick={this.updateLayout}>
                Update
              </Button>
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
          moment.`,
  };

  public render() {
    const { title } = this.state;
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <SidePage>
              <SidePage.Header>{title}</SidePage.Header>
              <SidePage.Body>
                <div
                  id="scrollable-content"
                  style={{
                    height: 1500,
                    background: theme.prototype.constructor.name.includes('Dark')
                      ? '' + linearDarkGradient + ''
                      : '' + linearLightGradient + '',
                  }}
                />
              </SidePage.Body>
              <SidePage.Footer gap={15}>
                <Button
                  onClick={() =>
                    this.setState({
                      title: title + title,
                    })
                  }
                >
                  Increase Title
                </Button>
                <Button
                  onClick={() =>
                    this.setState({
                      title: title.slice(title.length / 2),
                    })
                  }
                >
                  Decrease Title
                </Button>
              </SidePage.Footer>
            </SidePage>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default {
  title: 'SidePage',
  component: SidePage,
};

export const SidePageWithBlockBackground: Story = () => <Sample blockBackground />;
SidePageWithBlockBackground.storyName = 'SidePage with block background';

export const WithScrollableParentContent = () => <SidePageWithScrollableContent />;
WithScrollableParentContent.storyName = 'With scrollable parent content';
WithScrollableParentContent.parameters = { creevey: { skip: true } };

export const WithInputInHeader = () => <SidePageWithInputInHeader />;
WithInputInHeader.storyName = 'With Input in header';
WithInputInHeader.parameters = { creevey: { skip: true } };

export const SidePageOverAnotherSidePageStory: Story = () => <SidePageOverAnotherSidePage />;
SidePageOverAnotherSidePageStory.storyName = 'SidePage over another SidePage';

export const StickySidePageHeaderWhenAnotherSidePageStory: Story = () => <StickySidePageHeaderWhenAnotherSidePage />;
StickySidePageHeaderWhenAnotherSidePageStory.storyName = 'Sticky SidePageHeader when another SidePage';

export const SidePageWithConfiguration = () => <SidePageWithCloseConfiguration />;
SidePageWithConfiguration.storyName = 'SidePage with configuration';
SidePageWithConfiguration.parameters = { creevey: { skip: true } };

export const SidePageWithModal = () => <SidePageWithModalInside />;
SidePageWithModal.storyName = 'SidePage with Modal';
SidePageWithModal.parameters = { creevey: { skip: true } };

export const DisabledSidePage = () => (
  <SidePage disableClose>
    <SidePage.Header>Disabled</SidePage.Header>
    <SidePage.Body>Content of disabled body</SidePage.Body>
  </SidePage>
);
DisabledSidePage.storyName = 'Disabled SidePage';
DisabledSidePage.parameters = { creevey: { skip: true } };

export const SidePageWithLeftPositionStory = () => (
  <SidePageWithLeftPosition close={() => undefined} disableAnimations />
);
SidePageWithLeftPositionStory.storyName = 'SidePage with left position';
SidePageWithLeftPositionStory.parameters = { creevey: { captureElement: null } };

export const LeftSidePageWithRightSidePageStory = () => <LeftSidePageWithRightSidePage disableAnimations />;
LeftSidePageWithRightSidePageStory.storyName = 'Left SidePage With Right SidePage';
LeftSidePageWithRightSidePageStory.parameters = { creevey: { captureElement: null } };

export const Simple: Story = () => <SimpleSidePage />;

export const MobileSimple: Story = () => <SimpleSidePage />;

export const BodyWithoutFooter: Story = () => <Sample withoutFooter withContent withLongBody />;
BodyWithoutFooter.storyName = 'Body without Footer';

export const BodyWithoutHeader: Story = () => <Sample withoutHeader withContent withLongBody />;
BodyWithoutHeader.storyName = 'Body without Header';

export const SidePageWithFocusLockWhenBackgroundBlocked: Story = () => {
  return <Sample total={1} current={1} blockBackground />;
};
SidePageWithFocusLockWhenBackgroundBlocked.storyName = 'SidePage with FocusLock when background blocked';

export const SidePageWithVariableContent = () => <WithVariableContent />;
SidePageWithVariableContent.storyName = 'SidePage with variable content';
SidePageWithVariableContent.parameters = { creevey: { skip: true } };

export const TestUpdateLayoutMethodStory: Story = () => <TestUpdateLayoutMethod />;
TestUpdateLayoutMethodStory.storyName = 'test updateLayout method';

export const WithScrollableParentContentAndScrollingBeforeOpen = () => (
  <div style={{ width: '300px' }}>
    {textSample}
    {textSample}
    {textSample}
    {textSample}
    <Sample total={1} current={1} ignoreBackgroundClick withContent />
    {textSample}
    {textSample}
  </div>
);
WithScrollableParentContentAndScrollingBeforeOpen.storyName =
  'With scrollable parent content and scrolling before open';
WithScrollableParentContentAndScrollingBeforeOpen.parameters = { creevey: { skip: true } };

export const WithLongTitleStory: Story = () => <WithLongTitle />;
WithLongTitleStory.storyName = 'With long title';

const SidePageHeader = () => <SidePage.Header>Header</SidePage.Header>;
const SidePageBody = () => {
  return (
    <SidePage.Body>
      <SidePage.Container>
        {new Array(3).fill(textSample).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </SidePage.Container>
    </SidePage.Body>
  );
};
const SidePageFooter = (data: { hasPanel: boolean }) => <SidePage.Footer panel={data.hasPanel}>Footer</SidePage.Footer>;

export const SidePageWithChildrenFromOtherComponent: Story = () => {
  const [hasHeader, setHasHeader] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasPanel, setHasPanel] = useState(false);

  const handleHeaderButton = useCallback(() => setHasHeader(!hasHeader), [hasHeader]);
  const handleFooterButton = useCallback(() => setHasFooter(!hasFooter), [hasFooter]);
  const handlePanelButton = useCallback(() => setHasPanel(!hasPanel), [hasPanel]);

  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <Button data-tid={'SidePage__header-toggle'} onClick={handleHeaderButton}>
          toggle header
        </Button>
      </div>
      <div style={{ paddingBottom: 10 }}>
        <Button data-tid="SidePage__footer-toggle" onClick={handleFooterButton}>
          toggle footer
        </Button>
      </div>
      <div style={{ paddingBottom: 10 }}>
        <Button data-tid="SidePage__panel-toggle" onClick={handlePanelButton}>
          toggle panel
        </Button>
      </div>
      <SidePage>
        {hasHeader && <SidePageHeader />}
        <SidePageBody />
        {hasFooter && <SidePageFooter hasPanel={hasPanel} />}
      </SidePage>
    </>
  );
};
SidePageWithChildrenFromOtherComponent.storyName = 'SidePage with Custom Children';

export const SidePageChangeBlockBgAndIgnoreBgClick: Story = () => {
  const [opened, setOpened] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground={edit} ignoreBackgroundClick={edit}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                                60deg,
                                #808080,
                                #808080 20px,
                                #d3d3d3 20px,
                                #d3d3d3 40px
                              )`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <p>Use rxjs operators with react hooks</p>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={() => setEdit((prev) => !prev)}>Редактировать</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }
  function open() {
    setOpened(true);
  }
  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && renderSidePage()}
      <Button onClick={open} data-tid="open-side-page">
        Open
      </Button>
    </div>
  );
};
SidePageChangeBlockBgAndIgnoreBgClick.storyName =
  'SidePage with dynamic change blockBackground and ignoreBackgroundClick';

export const NestedSidePagesWithChangingVeil: Story = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [edit1, setEdit1] = React.useState(false);
  const [edit2, setEdit2] = React.useState(false);
  const [edit3, setEdit3] = React.useState(false);

  return (
    <div>
      {open1 && (
        <SidePage
          width={800}
          onClose={() => {
            setOpen1(false);
          }}
          ignoreBackgroundClick={edit1}
          blockBackground={edit1}
        >
          <SidePage.Header>Title 1</SidePage.Header>
          <SidePage.Body>
            <Button
              onClick={() => {
                setOpen2(true);
              }}
              data-tid="open-second-side-page"
            >
              Open SidePage 2
            </Button>
            <Button onClick={() => setEdit1((prev) => !prev)} data-tid="veil-first-from-first-side-page">
              Редактировать
            </Button>
            {open2 && (
              <SidePage
                width={800}
                onClose={() => {
                  setOpen2(false);
                }}
                ignoreBackgroundClick={edit2}
                blockBackground={edit2}
              >
                <SidePage.Header>Title 2</SidePage.Header>
                <SidePage.Body>
                  <Button
                    onClick={() => {
                      setOpen3(true);
                    }}
                    data-tid="open-third-side-page"
                  >
                    Open SidePage 3
                  </Button>
                  <Button onClick={() => setEdit1((prev) => !prev)} data-tid="veil-first-from-second-side-page">
                    Редактировать1
                  </Button>
                  <Button onClick={() => setEdit2((prev) => !prev)} data-tid="veil-second-from-second-side-page">
                    Редактировать2
                  </Button>
                  {open3 && (
                    <SidePage
                      width={800}
                      onClose={() => {
                        setOpen3(false);
                      }}
                      ignoreBackgroundClick={edit3}
                      blockBackground={edit3}
                    >
                      <SidePage.Header>Title 3</SidePage.Header>
                      <SidePage.Body>
                        <Button onClick={() => setEdit1((prev) => !prev)} data-tid="veil-first-from-third-side-page">
                          Редактировать1
                        </Button>
                        <Button onClick={() => setEdit2((prev) => !prev)} data-tid="veil-second-from-third-side-page">
                          Редактировать2
                        </Button>
                        <Button onClick={() => setEdit3((prev) => !prev)} data-tid="veil-third-from-third-side-page">
                          Редактировать3
                        </Button>
                      </SidePage.Body>
                      <SidePage.Footer>
                        <Button
                          onClick={() => {
                            setOpen3(false);
                          }}
                          data-tid="close-third-side-page"
                        >
                          Close
                        </Button>
                      </SidePage.Footer>
                    </SidePage>
                  )}
                </SidePage.Body>
                <SidePage.Footer>
                  <Button
                    onClick={() => {
                      setOpen2(false);
                    }}
                    data-tid="close-second-side-page"
                  >
                    Close
                  </Button>
                </SidePage.Footer>
              </SidePage>
            )}
          </SidePage.Body>

          <SidePage.Footer>
            <Button
              onClick={() => {
                setOpen1(false);
              }}
              data-tid="close-first-side-page"
            >
              Close
            </Button>
          </SidePage.Footer>
        </SidePage>
      )}

      <Button
        onClick={() => {
          setOpen1(true);
        }}
        data-tid="open-first-side-page"
      >
        Open SidePage
      </Button>
    </div>
  );
};
NestedSidePagesWithChangingVeil.storyName = 'Nested SidePages with changing veil';
