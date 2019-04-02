// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip, { TooltipProps, TooltipTrigger } from '../Tooltip';
import Button from '../../Button';
import { PopupPosition, PopupPositions } from '../../Popup';
import { createPropsGetter } from '../../internal/createPropsGetter';
import Textarea from '../../Textarea';
import Checkbox from '../../Checkbox';
import Gapped from '../../Gapped';
import Input from '../../Input';

interface TestTooltipProps {
  pos?: PopupPosition;
  trigger?: TooltipTrigger;
  useWrapper?: boolean;
  disableAnimations?: boolean;
}

class TestTooltip extends React.Component<TestTooltipProps> {
  public static defaultProps: {
    pos: PopupPosition;
  } = {
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

storiesOf('Tooltip', module)
  .add('simple tooltip', () => (
    <TestTooltip>
      <Button>Hover me!</Button>
    </TestTooltip>
  ))
  .add('static tooltip', () => (
    <TestTooltip trigger="opened">
      <div>Look bottom</div>
    </TestTooltip>
  ))
  .add('clickable tooltip', () => (
    <TestTooltip trigger="click">
      <Button>Click me</Button>
    </TestTooltip>
  ))
  .add('focus tooltip', () => (
    <TestTooltip trigger="focus" disableAnimations>
      <Button>Focus me</Button>
    </TestTooltip>
  ))
  .add('focus tooltip (native input)', () => (
    <TestTooltip trigger="focus" disableAnimations>
      <input />
    </TestTooltip>
  ))
  .add('tooltip left', () => (
    <TestTooltip trigger="opened" pos="left top">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('tooltip right', () => (
    <TestTooltip useWrapper={false} trigger="opened" pos="right top">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('tooltip bottom', () => (
    <TestTooltip trigger="opened" pos="bottom center">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('tooltip with functional component child', () => {
    function PureComp() {
      return <div>Pure Component!</div>;
    }

    return (
      <TestTooltip trigger="opened" pos="bottom center">
        <PureComp />
      </TestTooltip>
    );
  })
  .add('tooltip with functional component child hover', () => {
    function PureComp() {
      return <div>Pure Component!</div>;
    }

    return (
      <TestTooltip trigger="hover" pos="bottom center">
        <PureComp />
      </TestTooltip>
    );
  })
  .add('tooltip with functional component click', () => {
    function PureComp() {
      return <div>Pure Component!</div>;
    }

    return (
      <TestTooltip trigger="click" pos="bottom center">
        <PureComp />
      </TestTooltip>
    );
  })
  .add('MyCustomTooltip', () => <MyCustomTooltip />)
  .add('ManualTooltip', () => <ManualTooltip />)
  .add('tooltip without animations', () => (
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
  ))
  .add('hover on child only', () => (
    <TestTooltip trigger="hoverAnchor">
      <Button>
        <code>trigger="hoverAnchor"</code>
      </Button>
    </TestTooltip>
  ))
  .add('Tooltips without wrapper around inline-block with 50% width', () => (
    <div style={{ padding: '150px', width: '500px' }}>
      {PopupPositions.reduce(
        (child, position) => (
          <Tooltip useWrapper={false} render={() => position} pos={position}>
            {child}
          </Tooltip>
        ),
        <Textarea rows={10} resize="none" width="50%">
          {"I'm inline-block with 50% width.\n\nHover me!"}
        </Textarea>,
      )}
    </div>
  ))
  .add('Opened tooltip without wrapper', () => (
    <TestTooltip useWrapper={false} trigger="opened" pos="left top">
      <span>Without wrapper</span>
    </TestTooltip>
  ))
  .add('Tooltip with external dynamic content', () => (
    <DynamicContentStory TooltipComponentClass={ExternalDynamicContentTooltip} />
  ))
  .add('Tooltip with internal dynamic content', () => (
    <DynamicContentStory TooltipComponentClass={InternalDynamicContentTooltip} />
  ))
  .add('Tooltip with trigger=click', () => <TooltipWithClickTrigger />)
  .add('Tooltip with dynamic anchor', () => <DynamicAnchorTooltip />)
  .add('Multiple tooltips with useWrapper=false', () => <MultipleTooltips />)
  .add('Tooltip with Input and switchable content', () => <TooltipWithInput />)
  .add('dynamic triggers', () => <DynamicTriggers />);

class TooltipWithInput extends React.Component {
  public state = { show: false };
  public render() {
    return (
      <div style={{ padding: '0 10px 70px' }}>
        <Tooltip render={this.renderContent} pos="bottom right" trigger="click">
          <Input onChange={(_, v) => this.setState({ show: Boolean(v) })} />
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
  position?: PopupPosition;
}
interface HasDynamicContentState {
  content: React.ReactNode;
}

class ExternalDynamicContentTooltip extends React.Component<HasPopupPositionProps, HasDynamicContentState> {
  public state: HasDynamicContentState = {
    content: SMALL_CONTENT,
  };

  public render() {
    return (
      <Tooltip
        pos={this.props.position}
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

class TooltipWithDynamicContent extends React.Component<{}, HasDynamicContentState> {
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

class InternalDynamicContentTooltip extends React.Component<HasPopupPositionProps, {}> {
  public render() {
    return (
      <Tooltip
        allowedPositions={['top left', 'left middle', 'right middle', 'bottom left']}
        pos={this.props.position}
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

interface DynamicAnchorState {
  isFirst: boolean;
}
class DynamicAnchor extends React.Component<{}, DynamicAnchorState> {
  public state: DynamicAnchorState = {
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

const DYNAMIC_TOOLTIP_POSITIONS: PopupPosition[] = [
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
            <TooltipComponentClass position={position} />
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

class TooltipWithClickTrigger extends React.Component<{}, {}> {
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
        <Checkbox checked={true}>Item 1</Checkbox>
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
        <Checkbox checked={true}>Item 3</Checkbox>
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

class DynamicTriggers extends React.Component<{}, DynamicTriggersState> {
  public state: DynamicTriggersState = {};

  public render() {
    const triggers: TooltipTrigger[] = ['hover', 'click', 'focus', 'opened', 'closed', 'hoverAnchor'];
    return (
      <div>
        <div>
          {triggers.map(trigger => (
            <button
              id={trigger}
              key={trigger}
              onClick={() => this.setTrigger(trigger)}
              disabled={this.state.trigger === trigger}
            >
              {trigger}
            </button>
          ))}
        </div>
        <TestTooltip trigger={this.state.trigger} disableAnimations>
          <button id="anchor">Anchor</button>
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
