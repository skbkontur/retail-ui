// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StyledTooltip, { TooltipTrigger } from '../StyledTooltip';
import Button from '../../Button';
import { PopupPosition } from '../../Popup';
import { createPropsGetter } from '../../internal/createPropsGetter';

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
        <StyledTooltip
          pos={this.getProps().pos}
          render={() => <div>Hey there!</div>}
          trigger={trigger}
          useWrapper={this.props.useWrapper}
          disableAnimations={this.props.disableAnimations}
        >
          {children}
        </StyledTooltip>
      </div>
    );
  }
}

storiesOf('StyledTooltip', module)
  .add('simple StyledTooltip', () => (
    <TestTooltip>
      <Button>Hover me!</Button>
    </TestTooltip>
  ))
  .add('static StyledTooltip', () => (
    <TestTooltip trigger="opened">
      <div>Look bottom</div>
    </TestTooltip>
  ))
  .add('clickable StyledTooltip', () => (
    <TestTooltip trigger="click">
      <Button>Click me</Button>
    </TestTooltip>
  ))
  .add('focus StyledTooltip', () => (
    <TestTooltip trigger="focus" disableAnimations>
      <Button>Focus me</Button>
    </TestTooltip>
  ))
  .add('focus StyledTooltip (native input)', () => (
    <TestTooltip trigger="focus" disableAnimations>
      <input />
    </TestTooltip>
  ))
  .add('StyledTooltip left', () => (
    <TestTooltip trigger="opened" pos="left top">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('StyledTooltip right', () => (
    <TestTooltip useWrapper={false} trigger="opened" pos="right top">
      <span>Some label</span>
    </TestTooltip>
  ))
  .add('StyledTooltip bottom', () => (
    <TestTooltip trigger="opened" pos="bottom center">
      <span>Some label</span>
    </TestTooltip>
  ));
