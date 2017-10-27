// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../Tooltip';
import Button from '../../Button';

class TestTooltip extends React.Component<*> {
  static defaultProps = {
    pos: 'top center'
  };

  render() {
    const { pos, trigger, children } = this.props;

    return (
      <div style={{ padding: '150px' }}>
        <Tooltip
          pos={pos}
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
  });
