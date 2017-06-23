// @flow
import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Kebab from '../Kebab';
import MenuItem from '../../MenuItem';

storiesOf('Kebab', module)
  .addDecorator(story =>
    <div
      style={{
        padding: 120,
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  )
  .add('16px', () => <SomethingWithKebab size="small" />)
  .add('20px', () => <SomethingWithKebab size="large" />);

class SomethingWithKebab extends Component {
  render() {
    return (
      <Kebab
        size={this.props.size}
        onOpen={action('open')}
        onClose={action('close')}
      >
        <MenuItem>123</MenuItem>
        <MenuItem>456</MenuItem>
        <MenuItem>789</MenuItem>
      </Kebab>
    );
  }
}
