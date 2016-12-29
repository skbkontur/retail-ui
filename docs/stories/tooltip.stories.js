// @flow
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button';

class TestTooltip extends React.Component {
  render() {
    return (
      <div>
        <Tooltip
          render={() => <div>Hey there!</div>}
          trigger={this.props.trigger}
        >{this.props.children}</Tooltip>
      </div>
    );
  }
}

storiesOf('Tooltip', module).
  add('simple tooltip', () => (
    <TestTooltip><Button>Hover me!</Button></TestTooltip>
  )).
  add('static tooltip', () => (
    <TestTooltip trigger="opened">
      <div>Look bottom</div>
    </TestTooltip>
  ));
