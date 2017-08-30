// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Toggle from '../Toggle';

class Comp extends Component<*, *> {
  constructor(props) {
    super(props);
    this.state = { checked: true };
  }

  toggle(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onChange={this.toggle.bind(this)}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

storiesOf('Toggle', module).add('plain', () => <Comp />);
