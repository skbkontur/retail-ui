// @flow
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from '../Checkbox';

class PlainComponent extends Component {
  state = {
    checked: false
  };

  render() {
    const { checked } = this.state;
    return (
      <Checkbox
        onChange={() => this.setState({ checked: !checked })}
        checked={checked}
      >
        Plain checkbox
      </Checkbox>
    );
  }
}

storiesOf('Checkbox', module)
  .add('plain', () => <PlainComponent />)
  .add('unchecked', () => <Checkbox>Unchecked</Checkbox>)
  .add('checked', () => <Checkbox checked>Checked</Checkbox>)
  .add('disabled', () => <Checkbox disabled>Disabled</Checkbox>)
  .add('disabled checked', () => (
    <Checkbox disabled checked>Disabled and checked</Checkbox>
  ))
  .add('error', () => <Checkbox error>Error</Checkbox>)
  .add('with mouse enter/leave handlers', () => (
    <Checkbox
      onMouseEnter={() => console.count('enter')}
      onMouseLeave={() => console.count('leave')}
    >
      Hover me
    </Checkbox>
  ));
