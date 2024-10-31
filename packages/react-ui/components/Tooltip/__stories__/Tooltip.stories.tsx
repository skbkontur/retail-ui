// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { CSSProperties } from 'react';
import HelpDotIcon from '@skbkontur/react-icons/HelpDot';

import { Nullable } from '../../../typings/utility-types';
import { Story } from '../../../typings/stories';
import { Tooltip, TooltipProps, TooltipTrigger } from '../Tooltip';
import { Button } from '../../Button';
import { PopupPositionsType, PopupPinnablePositions } from '../../../internal/Popup';
import { createPropsGetter } from '../../../lib/createPropsGetter';
import { Textarea } from '../../Textarea';
import { Checkbox } from '../../Checkbox';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';

interface TestTooltipProps {
  pos?: PopupPositionsType;
  trigger?: TooltipTrigger;
  useWrapper?: boolean;
  disableAnimations?: boolean;
}

class TestTooltip extends React.Component<React.PropsWithChildren<TestTooltipProps>> {
  public static defaultProps: TestTooltipProps = {
    pos: 'top center',
  };

  private getProps = createPropsGetter(TestTooltip.defaultProps);

  public render(): JSX.Element {
    const { trigger, children } = this.props;

    return (
      <div style={{ padding: '150px' }}>
        <Tooltip
          pos={this.getProps().pos}
          render={() => <div>Hey there!</div>}
          trigger={trigger}
          useWrapper={this.props.useWrapper}
          disableAnimations={this.props.disableAnimations}
        >
          {children}
        </Tooltip>
      </div>
    );
  }
}

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const SimpleTooltip = () => (
  <TestTooltip>
    <Button>Hover me!</Button>
  </TestTooltip>
);
SimpleTooltip.storyName = 'simple tooltip';
SimpleTooltip.parameters = { creevey: { skip: true } };

export const StaticTooltip = () => (
  <TestTooltip trigger="opened">
    <div>Look bottom</div>
  </TestTooltip>
);
StaticTooltip.storyName = 'static tooltip';

export const ClickableTooltip = () => (
  <TestTooltip trigger="click">
    <Button>Click me</Button>
  </TestTooltip>
);
ClickableTooltip.storyName = 'clickable tooltip';
ClickableTooltip.parameters = { creevey: { skip: true } };

export const FocusTooltip: Story = () => (
  <TestTooltip trigger="focus" disableAnimations>
    <Button>Focus me</Button>
  </TestTooltip>
);
FocusTooltip.storyName = 'focus tooltip';

export const FocusTooltipNativeInput: Story = () => (
  <TestTooltip trigger="focus" disableAnimations>
    <input />
  </TestTooltip>
);
FocusTooltipNativeInput.storyName = 'focus tooltip (native input)';

export const TooltipLeft = () => (
  <TestTooltip trigger="opened" pos="left top">
    <span>Some label</span>
  </TestTooltip>
);
TooltipLeft.storyName = 'tooltip left';

export const TooltipRight = () => (
  <TestTooltip useWrapper={false} trigger="opened" pos="right top">
    <span>Some label</span>
  </TestTooltip>
);
TooltipRight.storyName = 'tooltip right';

export const TooltipBottom = () => (
  <TestTooltip trigger="opened" pos="bottom center">
    <span>Some label</span>
  </TestTooltip>
);
TooltipBottom.storyName = 'tooltip bottom';

export const TooltipWithFunctionalComponentChild = () => {
  function PureComp() {
    return <div>Pure Component!</div>;
  }

  return (
    <TestTooltip trigger="opened" pos="bottom center">
      <PureComp />
    </TestTooltip>
  );
};
TooltipWithFunctionalComponentChild.storyName = 'tooltip with functional component child';
TooltipWithFunctionalComponentChild.parameters = { creevey: { skip: true } };

export const TooltipWithFunctionalComponentChildHover = () => {
  function PureComp() {
    return <div>Pure Component!</div>;
  }

  return (
    <TestTooltip trigger="hover" pos="bottom center">
      <PureComp />
    </TestTooltip>
  );
};
TooltipWithFunctionalComponentChildHover.storyName = 'tooltip with functional component child hover';
TooltipWithFunctionalComponentChildHover.parameters = { creevey: { skip: true } };

export const TooltipWithFunctionalComponentClick = () => {
  function PureComp() {
    return <div>Pure Component!</div>;
  }

  return (
    <TestTooltip trigger="click" pos="bottom center">
      <PureComp />
    </TestTooltip>
  );
};
TooltipWithFunctionalComponentClick.storyName = 'tooltip with functional component click';
TooltipWithFunctionalComponentClick.parameters = { creevey: { skip: true } };

export const MyCustomTooltipStory = () => <MyCustomTooltip />;
MyCustomTooltipStory.storyName = 'MyCustomTooltip';
MyCustomTooltipStory.parameters = { creevey: { skip: true } };

export const ManualTooltipStory = () => <ManualTooltip />;
ManualTooltipStory.storyName = 'ManualTooltip';
ManualTooltipStory.parameters = { creevey: { skip: true } };

export const TooltipWithoutAnimations = () => (
  <div>
    <Tooltip render={() => 'No disableAnimations prop'} trigger={'hover'}>
      <Button>Hover me (No disableAnimations prop)</Button>
    </Tooltip>
    <Tooltip render={() => 'disableAnimations={false}'} trigger={'hover'} disableAnimations={false}>
      <Button>Hover me (disableAnimations: false)</Button>
    </Tooltip>
    <Tooltip render={() => 'disableAnimations={true}'} trigger={'hover'} disableAnimations>
      <Button>Hover me (disableAnimations: true)</Button>
    </Tooltip>
  </div>
);
TooltipWithoutAnimations.storyName = 'tooltip without animations';
TooltipWithoutAnimations.parameters = { creevey: { skip: true } };

export const HoverOnChildOnly = () => (
  <TestTooltip trigger="hoverAnchor">
    <Button>
      <code>trigger=&quot;hoverAnchor&quot;</code>
    </Button>
  </TestTooltip>
);
HoverOnChildOnly.storyName = 'hover on child only';
HoverOnChildOnly.parameters = { creevey: { skip: true } };

export const TooltipsWithoutWrapperAroundInlineBlockWithRelativeWidth: Story = () => (
  <div style={{ padding: '150px', width: '700px' }}>
    {PopupPinnablePositions.reduce(
      (child, position) => (
        <Tooltip useWrapper={false} render={() => position} pos={position} trigger="opened" closeButton={false}>
          {child}
        </Tooltip>
      ),
      <Textarea rows={20} resize="none" width="70%">
        {"I'm inline-block with relative width."}
      </Textarea>,
    )}
  </div>
);
TooltipsWithoutWrapperAroundInlineBlockWithRelativeWidth.storyName =
  'Tooltips without wrapper around inline-block with relative width';
TooltipsWithoutWrapperAroundInlineBlockWithRelativeWidth.parameters = { creevey: { delay: 2000 } };

export const OpenedTooltipWithoutWrapper = () => (
  <TestTooltip useWrapper={false} trigger="opened" pos="left top">
    <span>Without wrapper</span>
  </TestTooltip>
);
OpenedTooltipWithoutWrapper.storyName = 'Opened tooltip without wrapper';

export const TooltipWithExternalDynamicContent: Story = () => (
  <DynamicContentStory TooltipComponentClass={ExternalDynamicContentTooltip} />
);
TooltipWithExternalDynamicContent.storyName = 'Tooltip with external dynamic content';

export const TooltipWithInternalDynamicContent = () => (
  <DynamicContentStory TooltipComponentClass={InternalDynamicContentTooltip} />
);
TooltipWithInternalDynamicContent.storyName = 'Tooltip with internal dynamic content';
TooltipWithInternalDynamicContent.parameters = { creevey: { skip: true } };

export const TooltipWithTriggerClick = () => <TooltipWithClickTrigger />;
TooltipWithTriggerClick.storyName = 'Tooltip with trigger=click';
TooltipWithTriggerClick.parameters = { creevey: { skip: true } };

export const TooltipWithDynamicAnchor = () => <DynamicAnchorTooltip />;
TooltipWithDynamicAnchor.storyName = 'Tooltip with dynamic anchor';
TooltipWithDynamicAnchor.parameters = { creevey: { skip: true } };

export const MultipleTooltipsWithUseWrapperFalse = () => <MultipleTooltips />;
MultipleTooltipsWithUseWrapperFalse.storyName = 'Multiple tooltips with useWrapper=false';
MultipleTooltipsWithUseWrapperFalse.parameters = { creevey: { skip: true } };

export const TooltipWithInputAndSwitchableContent: Story = () => <TooltipWithInput />;
TooltipWithInputAndSwitchableContent.storyName = 'Tooltip with Input and switchable content';

export const DynamicTriggersStory: Story = () => <DynamicTriggers />;
DynamicTriggersStory.storyName = 'dynamic triggers';

export const RenderInFirstAvailablePosition: Story = () => (
  <div style={{ padding: '100px' }}>
    <DynamicContentTooltip />
  </div>
);
RenderInFirstAvailablePosition.storyName = 'Render in first available position';

interface DynamicContentTooltipState {
  content: React.ReactNode;
  opened: boolean;
}

class DynamicContentTooltip extends React.Component {
  public state: DynamicContentTooltipState = {
    content: SMALL_CONTENT,
    opened: false,
  };

  public render() {
    return (
      <Tooltip
        allowedPositions={['top left', 'left middle', 'right middle', 'bottom left']}
        render={this.tooltipContentGetter}
        trigger={this.state.opened ? 'opened' : 'closed'}
        closeButton={false}
        useWrapper={false}
      >
        <Button size={'small'} width={'100%'} onClick={this.buttonClickHandler}>
          Toggle content
        </Button>
      </Tooltip>
    );
  }

  private buttonClickHandler = () => {
    const getContent = (state: DynamicContentTooltipState) => {
      if (state.opened) {
        return state.content;
      } else if (state.content === SMALL_CONTENT) {
        return LARGE_CONTENT;
      }

      return SMALL_CONTENT;
    };

    this.setState((state: DynamicContentTooltipState) => ({
      content: getContent(state),
      opened: !state.opened,
    }));
  };

  private tooltipContentGetter = () => {
    return this.state.content;
  };
}

class TooltipWithInput extends React.Component {
  public state = { show: false };
  public render() {
    return (
      <div style={{ padding: '0 10px 70px' }}>
        <Tooltip render={this.renderContent} pos="bottom right" trigger="click">
          <Input onValueChange={(v) => this.setState({ show: Boolean(v) })} />
        </Tooltip>
      </div>
    );
  }

  public renderContent = () => {
    if (this.state.show) {
      return <span>{'Content'}</span>;
    }
    return null;
  };
}

interface MyCustomTooltipState {
  state: TooltipTrigger;
}

class MyCustomTooltip extends React.Component<TestTooltipProps, MyCustomTooltipState> {
  public state: MyCustomTooltipState = {
    state: 'hover',
  };

  public render() {
    const tooltipProps: Partial<TooltipProps> =
      this.state.state === 'hover'
        ? { trigger: 'hover' }
        : {
            trigger: 'opened',
            onCloseRequest: () => this.setState({ state: 'hover' }),
          };

    return (
      <Tooltip render={() => 'hola'} {...tooltipProps}>
        <Button onClick={() => this.setState({ state: 'opened' })}>Hey</Button>
      </Tooltip>
    );
  }
}

class ManualTooltip extends React.Component<TestTooltipProps, MyCustomTooltipState> {
  public state: MyCustomTooltipState = {
    state: 'opened',
  };

  public render() {
    const tooltipProps: Partial<TooltipProps> = {
      trigger: this.state.state,
      closeButton: false,
    };

    return (
      <Tooltip render={() => 'hola'} {...tooltipProps}>
        <Button
          onClick={() =>
            this.setState({
              state: this.state.state === 'opened' ? 'closed' : 'opened',
            })
          }
        >
          Hey
        </Button>
      </Tooltip>
    );
  }
}

const SMALL_CONTENT = <span>Sample text</span>;
function getSmallContent() {
  return SMALL_CONTENT;
}
const LARGE_CONTENT = (
  <span>
    Sample text, sample text, sample text, sample text, sample text
    <br />
    Sample text, sample text, sample text, sample text, sample text
    <br />
    Sample text, sample text, sample text, sample text, sample text
    <br />
    Sample text, sample text, sample text, sample text, sample text
    <br />
    Sample text, sample text, sample text, sample text, sample text
    <br />
    Sample text, sample text, sample text, sample text, sample text
  </span>
);

interface HasPopupPositionProps {
  pos: PopupPositionsType;
}
interface HasDynamicContentState {
  content: React.ReactNode;
}
class ExternalDynamicContentTooltip extends React.Component<HasPopupPositionProps> {
  public state: HasDynamicContentState = {
    content: SMALL_CONTENT,
  };

  public render() {
    return (
      <Tooltip
        pos={this.props.pos}
        allowedPositions={['top left', 'left middle', 'right middle', 'bottom left']}
        render={this.tooltipContentGetter}
        trigger={'opened'}
        closeButton={false}
        useWrapper={false}
      >
        <Button size={'small'} width={'100%'} onClick={this.buttonClickHandler}>
          Toggle content
        </Button>
      </Tooltip>
    );
  }

  private buttonClickHandler = () => {
    this.setState({
      content: this.state.content === SMALL_CONTENT ? LARGE_CONTENT : SMALL_CONTENT,
    });
  };

  private tooltipContentGetter = () => {
    return this.state.content;
  };
}

class TooltipWithDynamicContent extends React.Component {
  public state: HasDynamicContentState = {
    content: SMALL_CONTENT,
  };

  public render() {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ marginRight: 10 }}>
          <Button size={'small'} onClick={this.buttonClickHandler}>
            Toggle
          </Button>
        </div>
        <div>{this.state.content}</div>
      </div>
    );
  }
  private buttonClickHandler = () => {
    this.setState({
      content: this.state.content === SMALL_CONTENT ? LARGE_CONTENT : SMALL_CONTENT,
    });
  };
}

class InternalDynamicContentTooltip extends React.Component<HasPopupPositionProps> {
  public render() {
    return (
      <Tooltip
        allowedPositions={['top left', 'left middle', 'right middle', 'bottom left']}
        pos={this.props.pos}
        render={this.tooltipContentGetter}
        trigger={'opened'}
        closeButton={false}
        useWrapper={false}
      >
        <span>Tooltip anchor</span>
      </Tooltip>
    );
  }

  private tooltipContentGetter = () => {
    return <TooltipWithDynamicContent />;
  };
}

class DynamicAnchor extends React.Component {
  public state = {
    isFirst: true,
  };
  public render() {
    return this.state.isFirst ? (
      <span onClick={this.onClickHandler}>First anchor</span>
    ) : (
      <div style={{ display: 'inline-block' }} onClick={this.onClickHandler}>
        Second anchor
      </div>
    );
  }
  private onClickHandler = () => {
    this.setState({ isFirst: !this.state.isFirst });
  };
}

const DYNAMIC_TOOLTIP_POSITIONS: PopupPositionsType[] = [
  'top left',
  'top left',
  'left middle',
  'bottom left',
  'bottom left',
];

interface DynamicContentStoryProps {
  TooltipComponentClass: typeof ExternalDynamicContentTooltip | typeof InternalDynamicContentTooltip;
}
const DynamicContentStory = (props: DynamicContentStoryProps) => {
  const { TooltipComponentClass } = props;
  return (
    <div style={{ paddingTop: 70, paddingRight: 600, paddingBottom: 70, paddingLeft: 250, width: 130 }}>
      {DYNAMIC_TOOLTIP_POSITIONS.map((position, index) => {
        return (
          <div key={index} id={`Container-${index}`} style={{ paddingBottom: 70 }}>
            <TooltipComponentClass pos={position} />
          </div>
        );
      })}
    </div>
  );
};

function DynamicAnchorTooltip() {
  return (
    <div style={{ padding: 100 }}>
      <Tooltip pos={'bottom left'} render={getSmallContent} trigger={'hover'} useWrapper={false}>
        <DynamicAnchor />
      </Tooltip>
    </div>
  );
}

class TooltipWithClickTrigger extends React.Component {
  public render() {
    return (
      <div style={{ padding: 100 }}>
        <Tooltip pos={'bottom left'} render={this.outerTooltipContentGetter} trigger={'click'}>
          <span>Click me</span>
        </Tooltip>
      </div>
    );
  }
  private outerTooltipContentGetter = () => {
    return (
      <Gapped vertical gap={5}>
        <Checkbox checked>Item 1</Checkbox>
        <Checkbox checked={false}>Item 2</Checkbox>
        <Tooltip pos={'bottom left'} render={this.innerTooltipContentGetter} trigger={'click'}>
          <span>Click me for more...</span>
        </Tooltip>
      </Gapped>
    );
  };
  private innerTooltipContentGetter = () => {
    return (
      <Gapped vertical gap={5}>
        More:
        <Checkbox checked>Item 3</Checkbox>
        <Checkbox checked={false}>Item 4</Checkbox>
      </Gapped>
    );
  };
}

function MultipleTooltips() {
  return (
    <div style={{ padding: 150 }}>
      <Tooltip pos={'top center'} trigger={'click'} useWrapper={false} render={getSmallContent}>
        <Tooltip pos={'right middle'} trigger={'click'} useWrapper={false} render={getSmallContent}>
          <Tooltip pos={'bottom center'} trigger={'click'} useWrapper={false} render={getSmallContent}>
            <Tooltip pos={'left middle'} trigger={'click'} useWrapper={false} render={getSmallContent}>
              <span>Poor anchor</span>
            </Tooltip>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </div>
  );
}

interface DynamicTriggersState {
  trigger?: TooltipTrigger;
}

class DynamicTriggers extends React.Component {
  public state: DynamicTriggersState = {};

  public render() {
    const triggers: TooltipTrigger[] = ['hover', 'click', 'focus', 'opened', 'closed', 'hoverAnchor', 'hover&focus'];
    return (
      <div>
        <div style={{ marginBottom: 5 }}>
          {triggers.map((trigger) => (
            <button
              id={trigger.replace('&', '_')}
              key={trigger}
              onClick={() => this.setTrigger(trigger)}
              disabled={this.state.trigger === trigger}
            >
              {trigger}
            </button>
          ))}
        </div>
        <TestTooltip trigger={this.state.trigger} disableAnimations>
          <Button type={'button'}>Anchor</Button>
        </TestTooltip>
      </div>
    );
  }

  private setTrigger = (trigger: TooltipTrigger) => {
    this.setState({
      trigger,
    });
  };
}

class TestTooltipForManual extends React.Component {
  private tooltip: Tooltip | null = null;
  public state = { onOpenCalledTimes: 0, onCloseCalledTimes: 0 };

  render() {
    return (
      <div style={{ padding: '100px' }}>
        <Gapped vertical gap={10}>
          <div>onOpen called {this.state.onOpenCalledTimes} times</div>
          <div>onClose called {this.state.onCloseCalledTimes} times</div>
          <div />
        </Gapped>
        <Gapped>
          <Button key={'Show'} onClick={this.handleClickOnShow.bind(this)}>
            Show()
          </Button>
          <Button key={'Hide'} onClick={this.handleClickOnHide.bind(this)}>
            Hide()
          </Button>
        </Gapped>
        <Tooltip
          render={() => 'Opened by Show()'}
          trigger="manual"
          pos="bottom left"
          ref={(element) => {
            this.tooltip = element;
          }}
          onOpen={() => {
            this.setState({ onOpenCalledTimes: this.state.onOpenCalledTimes + 1 });
          }}
          onClose={() => {
            this.setState({ onCloseCalledTimes: this.state.onCloseCalledTimes + 1 });
          }}
        >
          <Button disabled>Anchor</Button>
        </Tooltip>
      </div>
    );
  }

  handleClickOnShow() {
    if (this.tooltip) {
      this.tooltip.show();
    }
  }
  handleClickOnHide() {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }
}

export const TooltipWithManualControl: Story = () => <TestTooltipForManual />;
TooltipWithManualControl.storyName = 'manual control';

export const TooltipWithIconFromPackage = () => (
  <TestTooltip trigger="opened" pos="bottom center">
    <HelpDotIcon />
  </TestTooltip>
);
TooltipWithIconFromPackage.storyName = 'tooltip with icon';

const FunctionalChild = () => {
  return <div>FunctionalChild</div>;
};
export const TooltipWithFunctionalChild = () => (
  <TestTooltip trigger="opened" pos="bottom center">
    <FunctionalChild />
  </TestTooltip>
);
TooltipWithFunctionalChild.storyName = 'tooltip with functional child';

const anchorStyle: CSSProperties = {
  left: 60,
  position: 'absolute',
  height: 55,
  width: 55,
  border: '1px solid #dfdede',
};

interface AnchorTooltipExampleState {
  anchor: Nullable<HTMLElement>;
}
class AnchorTooltipExample extends React.Component {
  public state: AnchorTooltipExampleState = {
    anchor: null,
  };

  render() {
    return (
      <>
        {this.state.anchor ? (
          <Tooltip anchorElement={this.state.anchor} render={() => 'Hello React'} trigger="hover" />
        ) : null}
        <div style={{ width: 180, height: 180, position: 'relative' }}>
          <div
            data-tid={`tooltip_anchor_0`}
            style={{
              ...anchorStyle,
              top: 60,
            }}
            onMouseEnter={(event) => this.setState({ anchor: event.target as HTMLElement })}
            onMouseLeave={() => this.setState({ anchor: null })}
          />
          <div
            data-tid={`tooltip_anchor_1`}
            style={{
              ...anchorStyle,
              top: 120,
            }}
            onMouseEnter={(event) => this.setState({ anchor: event.target as HTMLElement })}
            onMouseLeave={() => this.setState({ anchor: null })}
          />
        </div>
      </>
    );
  }
}

export const TooltipWithAnchor: Story = () => <AnchorTooltipExample />;

TooltipWithAnchor.storyName = 'Tooltip with anchor';
