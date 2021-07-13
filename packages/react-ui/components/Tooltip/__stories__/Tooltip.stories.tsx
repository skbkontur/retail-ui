import React from 'react';
import { CSFStory } from 'creevey';

import { Tooltip, TooltipProps, TooltipTrigger } from '../Tooltip';
import { Button } from '../../Button';
import { PopupPosition, PopupPositions } from '../../../internal/Popup';
import { createPropsGetter } from '../../../lib/createPropsGetter';
import { Textarea } from '../../Textarea';
import { Checkbox } from '../../Checkbox';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';
import { delay } from '../../../lib/utils';

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

export default { title: 'Tooltip' };

export const SimpleTooltip = () => (
  <TestTooltip>
    <Button>Hover me!</Button>
  </TestTooltip>
);
SimpleTooltip.story = { name: 'simple tooltip', parameters: { creevey: { skip: [true] } } };

export const StaticTooltip = () => (
  <TestTooltip trigger="opened">
    <div>Look bottom</div>
  </TestTooltip>
);
StaticTooltip.story = { name: 'static tooltip' };

export const ClickableTooltip = () => (
  <TestTooltip trigger="click">
    <Button>Click me</Button>
  </TestTooltip>
);
ClickableTooltip.story = { name: 'clickable tooltip', parameters: { creevey: { skip: [true] } } };

export const FocusTooltip: CSFStory<JSX.Element> = () => (
  <TestTooltip trigger="focus" disableAnimations>
    <Button>Focus me</Button>
  </TestTooltip>
);
FocusTooltip.story = {
  name: 'focus tooltip',
  parameters: {
    creevey: {
      tests: {
        async ['01 - plain']() {
          await delay(100);
          await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
        },
        async ['02 - focus']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .pause(500)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('02 - focus');
        },
        async ['03 - blur']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys(this.keys.TAB)
            .perform();
          // NOTE In FF next Tab key event will focus browser tab that fail next tests
          // Possible solution add focus trap element inside all stories as a decorator
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('03 - blur');
        },
      },
    },
  },
};

export const FocusTooltipNativeInput: CSFStory<JSX.Element> = () => (
  <TestTooltip trigger="focus" disableAnimations>
    <input />
  </TestTooltip>
);
FocusTooltipNativeInput.story = {
  name: 'focus tooltip (native input)',
  parameters: {
    creevey: {
      tests: {
        async ['01 - plain']() {
          await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
        },
        async ['02 - focus']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('02 - focus');
        },
        async ['03 - blur']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('03 - blur');
        },
      },
    },
  },
};

export const TooltipLeft = () => (
  <TestTooltip trigger="opened" pos="left top">
    <span>Some label</span>
  </TestTooltip>
);
TooltipLeft.story = { name: 'tooltip left' };

export const TooltipRight = () => (
  <TestTooltip useWrapper={false} trigger="opened" pos="right top">
    <span>Some label</span>
  </TestTooltip>
);
TooltipRight.story = { name: 'tooltip right' };

export const TooltipBottom = () => (
  <TestTooltip trigger="opened" pos="bottom center">
    <span>Some label</span>
  </TestTooltip>
);
TooltipBottom.story = { name: 'tooltip bottom' };

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
TooltipWithFunctionalComponentChild.story = {
  name: 'tooltip with functional component child',
  parameters: { creevey: { skip: [true] } },
};

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
TooltipWithFunctionalComponentChildHover.story = {
  name: 'tooltip with functional component child hover',
  parameters: { creevey: { skip: [true] } },
};

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
TooltipWithFunctionalComponentClick.story = {
  name: 'tooltip with functional component click',
  parameters: { creevey: { skip: [true] } },
};

export const MyCustomTooltipStory = () => <MyCustomTooltip />;
MyCustomTooltipStory.story = { name: 'MyCustomTooltip', parameters: { creevey: { skip: [true] } } };

export const ManualTooltipStory = () => <ManualTooltip />;
ManualTooltipStory.story = { name: 'ManualTooltip', parameters: { creevey: { skip: [true] } } };

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
TooltipWithoutAnimations.story = { name: 'tooltip without animations', parameters: { creevey: { skip: [true] } } };

export const HoverOnChildOnly = () => (
  <TestTooltip trigger="hoverAnchor">
    <Button>
      <code>trigger=&quot;hoverAnchor&quot;</code>
    </Button>
  </TestTooltip>
);
HoverOnChildOnly.story = { name: 'hover on child only', parameters: { creevey: { skip: [true] } } };

export const TooltipsWithoutWrapperAroundInlineBlockWith50Width: CSFStory<JSX.Element> = () => (
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
);
TooltipsWithoutWrapperAroundInlineBlockWith50Width.story = {
  name: 'Tooltips without wrapper around inline-block with 50% width',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie118px'] }],
      tests: {
        async hover() {
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: 'textarea' }),
            })
            .perform();
          await delay(1500);
          await this.expect(await this.takeScreenshot()).to.matchImage('hover');
        },
      },
    },
  },
};

export const OpenedTooltipWithoutWrapper = () => (
  <TestTooltip useWrapper={false} trigger="opened" pos="left top">
    <span>Without wrapper</span>
  </TestTooltip>
);
OpenedTooltipWithoutWrapper.story = { name: 'Opened tooltip without wrapper' };

export const TooltipWithExternalDynamicContent: CSFStory<JSX.Element> = () => (
  <DynamicContentStory TooltipComponentClass={ExternalDynamicContentTooltip} />
);
TooltipWithExternalDynamicContent.story = {
  name: 'Tooltip with external dynamic content',
  parameters: {
    creevey: {
      tests: {
        async ['01 - plain']() {
          await this.expect(await this.takeScreenshot()).to.matchImage('01 - plain');
        },
        async ['02 - changes top position if does not fit']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-0 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('02 - changes top position if does not fit');
        },
        async ['03 - does not change position back on shrink']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-0 button' }))
            .pause(100)
            .click(this.browser.findElement({ css: '#Container-0 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('03 - does not change position back on shrink');
        },
        async ['04 - does not change top position if fits']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-1 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('04 - does not change top position if fits');
        },
        async ['05 - does not change position on shrink']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-1 button' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-1 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('05 - does not change position on shrink');
        },
        async ['06 - changes left position if does not fit']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-2 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('06 - changes left position if does not fit');
        },
        async ['07 - does not change position back on shrink']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-2 button' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-2 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('07 - does not change position back on shrink');
        },
        async ['08 - does not change bottom position if fits']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-3 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('08 - does not change bottom position if fits');
        },
        async ['09 - does not change position on shrink']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-3 button' }))
            .pause(100)
            .click(this.browser.findElement({ css: '#Container-3 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('09 - does not change position on shrink');
        },
        async ['10 - does not change bottom position if does not fit']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-4 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage(
            '10 - does not change bottom position if does not fit',
          );
        },
        async ['11 - does not change position on shrink']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#Container-4 button' }))
            .pause(100)
            .click(this.browser.findElement({ css: '#Container-4 button' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('11 - does not change position on shrink');
        },
      },
    },
  },
};

export const TooltipWithInternalDynamicContent = () => (
  <DynamicContentStory TooltipComponentClass={InternalDynamicContentTooltip} />
);
TooltipWithInternalDynamicContent.story = {
  name: 'Tooltip with internal dynamic content',
  parameters: { creevey: { skip: [true] } },
};

export const TooltipWithTriggerClick = () => <TooltipWithClickTrigger />;
TooltipWithTriggerClick.story = { name: 'Tooltip with trigger=click', parameters: { creevey: { skip: [true] } } };

export const TooltipWithDynamicAnchor = () => <DynamicAnchorTooltip />;
TooltipWithDynamicAnchor.story = { name: 'Tooltip with dynamic anchor', parameters: { creevey: { skip: [true] } } };

export const MultipleTooltipsWithUseWrapperFalse = () => <MultipleTooltips />;
MultipleTooltipsWithUseWrapperFalse.story = {
  name: 'Multiple tooltips with useWrapper=false',
  parameters: { creevey: { skip: [true] } },
};

export const TooltipWithInputAndSwitchableContent: CSFStory<JSX.Element> = () => <TooltipWithInput />;
TooltipWithInputAndSwitchableContent.story = {
  name: 'Tooltip with Input and switchable content',
  parameters: {
    creevey: {
      tests: {
        async ['focus and types']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Hi')
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('focus and types');
        },
        async ['clear input']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: 'input' }))
            .sendKeys('Hi')
            .sendKeys(this.keys.BACK_SPACE, this.keys.BACK_SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('clear input');
        },
      },
    },
  },
};

export const DynamicTriggersStory: CSFStory<JSX.Element> = () => <DynamicTriggers />;
DynamicTriggersStory.story = {
  name: 'dynamic triggers',
  parameters: {
    creevey: {
      captureElement: '[data-comp-name~="TestTooltip"]',
      skip: [{ in: ['ie11', 'ie118px'], tests: ['hover - mouseEnter', 'hover&focus - mouseEnter'] }],
      tests: {
        async ['without trigger']() {
          await delay(100);
          await this.expect(await this.takeScreenshot()).to.matchImage('without trigger');
        },
        async ['hover - mouseEnter']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover' }))
            .move({
              origin: this.browser.findElement({ css: '[type="button"]' }),
            })
            .perform();
          await delay(100);
          await this.expect(await this.takeScreenshot()).to.matchImage('hover - mouseEnter');
        },
        async ['hover - mouseLeave']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover' }))
            .move({
              origin: this.browser.findElement({ css: '[type="button"]' }),
            })
            .pause(500)
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .move({
              origin: this.browser.findElement({ css: 'body' }),
            })
            .pause(500)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover - mouseLeave');
        },
        async ['click - click anchor']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#click' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('click - click anchor');
        },
        async ['click - click outside']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#click' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('click - click outside');
        },
        async ['focus - focus']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#focus' }))
            .perform();
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('focus - focus');
        },
        async ['focus - blur']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#focus' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('focus - blur');
        },
        async ['opened']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#opened' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('opened');
        },
        async ['closed']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#opened' }))
            .click(this.browser.findElement({ css: '#closed' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('closed');
        },
        async ['hover&focus - mouseEnter']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover_focus' }))
            .move({
              origin: this.browser.findElement({ css: '[type="button"]' }),
            })
            .perform();
          await delay(100);
          await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - mouseEnter');
        },
        async ['hover&focus - mouseLeave']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover_focus' }))
            .move({
              origin: this.browser.findElement({ css: '[type="button"]' }),
            })
            .move({
              origin: this.browser.findElement({ css: 'body' }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - mouseLeave');
        },
        async ['hover&focus - focus']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover_focus' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - focus');
        },
        async ['hover&focus - focus - mouseLeave']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover_focus' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .move({
              origin: this.browser.findElement({ css: 'body' }),
            })
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - focus - mouseLeave');
        },
        async ['hover&focus - blur']() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '#hover_focus' }))
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .pause(100)
            .sendKeys(this.keys.TAB)
            .click(this.browser.findElement({ css: 'body' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('hover&focus - blur');
        },
      },
    },
  },
};

export const RenderInFirstAvailablePosition: CSFStory<JSX.Element> = () => (
  <div style={{ padding: '100px' }}>
    <DynamicContentTooltip />
  </div>
);
RenderInFirstAvailablePosition.story = {
  name: 'Render in first available position',
  parameters: {
    creevey: {
      tests: {
        async ['render in available position']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('render in available position');
        },
        async ['relocate on new available position']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[type="button"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('relocate on new available position');
        },
      },
    },
  },
};

class DynamicContentTooltip extends React.Component<{}, { content: React.ReactNode; opened: boolean }> {
  public state = {
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
    this.setState((state) => ({
      content: state.opened ? state.content : state.content === SMALL_CONTENT ? LARGE_CONTENT : SMALL_CONTENT,
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

  render() {
    return (
      <div style={{ padding: '100px' }}>
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

export const TooltipWithManualControl: CSFStory<JSX.Element> = () => <TestTooltipForManual />;
TooltipWithManualControl.story = {
  name: 'manual control',
  parameters: {
    creevey: {
      tests: {
        async ['call show']() {
          const btns = await this.browser.findElements({ css: '[type="button"]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .click(btns[0])
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('call show');
        },
        async ['call hide after show']() {
          const btns = await this.browser.findElements({ css: '[type="button"]' });
          await this.browser
            .actions({
              bridge: true,
            })
            .click(btns[0])
            .click(btns[1])
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('call hide after show');
        },
      },
    },
  },
};
