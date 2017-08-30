// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../Tooltip';
import Button from '../../Button';

class TestTooltip extends React.Component<*> {
  render() {
    return (
      <div>
        <Tooltip
          render={() => <div>Hey there!</div>}
          trigger={this.props.trigger}
        >
          {this.props.children}
        </Tooltip>
      </div>
    );
  }
}

storiesOf('Tooltip', module)
  .add('simple tooltip', () =>
    <TestTooltip>
      <Button>Hover me!</Button>
    </TestTooltip>
  )
  .add('static tooltip', () =>
    <TestTooltip trigger="opened">
      <div>Look bottom</div>
    </TestTooltip>
  )
  .add('clickable tooltip', () =>
    <TestTooltip trigger="click">
      <Button>Click me</Button>
    </TestTooltip>
  );
