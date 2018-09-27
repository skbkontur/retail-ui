// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip, { TooltipTrigger, TooltipProps } from '../Tooltip';
import Button from '../../Button';
import { PopupPosition } from '../../Popup';
import { createPropsGetter } from '../../internal/createPropsGetter';
import Textarea from '../../Textarea';

interface TestTooltipProps {
  pos?: PopupPosition;
  trigger?: TooltipTrigger;
}

class TestTooltip extends React.Component<TestTooltipProps> {
  public static defaultProps: {
    pos: PopupPosition;
  } = {
    pos: 'top center'
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
    <TestTooltip trigger="focus">
      <Button>Focus me</Button>
    </TestTooltip>
  ))
  .add('tooltip left', () => (
    <TestTooltip trigger="opened" pos="left top">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('tooltip right', () => (
    <TestTooltip trigger="opened" pos="right top">
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
  .add('tooltip without animations', () => (
    <div>
      <Tooltip render={() => 'No disableAnimations prop'} trigger={'hover'}>
        <Button>Hover me (No disableAnimations prop)</Button>
      </Tooltip>
      <Tooltip
        render={() => 'disableAnimations={false}'}
        trigger={'hover'}
        disableAnimations={false}
      >
        <Button>Hover me (disableAnimations: false)</Button>
      </Tooltip>
      <Tooltip
        render={() => 'disableAnimations={true}'}
        trigger={'hover'}
        disableAnimations={true}
      >
        <Button>Hover me (disableAnimations: true)</Button>
      </Tooltip>
    </div>
  ))
  .add('tooltip with inline-block caption', () => (
    <TestTooltip trigger="opened" pos="top center">
      <span
        style={{
          display: 'inline-block',
          padding: '30px 40px',
          border: '2px solid'
        }}
      >
        I'm inline-block with paddings
      </span>
    </TestTooltip>
  ))
  .add('tooltip with 50% width element', () => (
    <div style={{ width: '500px' }}>
      <Tooltip
        trigger="opened"
        pos="bottom center"
        render={() => '50% width content'}
      >
        <Button width="50%">50% width content</Button>
      </Tooltip>
    </div>
  ))
  .add('tooltip with multiline element', () => (
    <div style={{ width: '500px' }}>
      <Tooltip trigger="opened" pos="bottom center" render={() => 'Textarea'}>
        <Textarea rows={5} width="50%" />
      </Tooltip>
    </div>
  ))
  .add('tooltip with multiple inline elements', () => (
    <div style={{ width: '500px' }}>
      <Tooltip
        trigger="opened"
        pos="bottom center"
        render={() => '50% width content'}
      >
        <span style={{ width: '100%', display: 'inline-block' }}>
          <Button width="50%">50% width content</Button>
          <Button width="50%">50% width content</Button>
        </span>
      </Tooltip>
    </div>
  ));

interface MyCustomTooltipState {
  state: TooltipTrigger;
}

class MyCustomTooltip extends React.Component<
  TestTooltipProps,
  MyCustomTooltipState
> {
  public state: MyCustomTooltipState = {
    state: 'hover'
  };

  public render() {
    const tooltipProps: Partial<TooltipProps> =
      this.state.state === 'hover'
        ? { trigger: 'hover' }
        : {
            trigger: 'opened',
            onCloseRequest: () => this.setState({ state: 'hover' })
          };

    return (
      <Tooltip render={() => 'hola'} {...tooltipProps}>
        <Button onClick={() => this.setState({ state: 'opened' })}>Hey</Button>
      </Tooltip>
    );
  }
}
