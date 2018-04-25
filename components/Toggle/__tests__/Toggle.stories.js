// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Toggle from '../Toggle';
import Gapped from '../../Gapped/Gapped';

class Comp extends Component<*, *> {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  toggle(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <Toggle
            checked={this.state.checked}
            onChange={this.toggle.bind(this)}
          />{' '}
          {this.state.checked ? 'On' : 'Off'}
        </div>
        <div>
          <Toggle checked={false} onChange={null} disabled />
          {' Disabled'}
        </div>
        <div>
          <Toggle checked={true} onChange={null} disabled />
          {' Checked disabled'}
        </div>
      </Gapped>
    );
  }
}

storiesOf('Toggle', module).add('plain', () => <Comp />);
