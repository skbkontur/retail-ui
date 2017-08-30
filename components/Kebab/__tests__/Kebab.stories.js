// @flow
import React, { Component } from 'react';
import { storiesOf, action } from '@storybook/react';
import Kebab from '../Kebab';
import MenuItem from '../../MenuItem';

storiesOf('Kebab', module)
  .addDecorator(story =>
    <div
      style={{
        padding: '120px 0',
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  )
  .add('14px', () => <SomethingWithKebab size="small" />)
  .add('20px', () => <SomethingWithKebab size="large" />)
  .add('20px-disabled', () => <SomethingWithKebab size="large" disabled />);

class SomethingWithKebab extends Component<{
  size: 'small' | 'large',
  disabled?: boolean
}> {
  render() {
    return (
      <div style={{ width: 200, textAlign: 'center' }}>
        Pikachu{' '}
        <Kebab
          size={this.props.size}
          onOpen={action('open')}
          onClose={action('close')}
          disabled={this.props.disabled}
        >
          <MenuItem onClick={action('First')}>First</MenuItem>
          <MenuItem onClick={action('Second')}>Second</MenuItem>
          <MenuItem onClick={action('Uno')}>Uno</MenuItem>
        </Kebab>
      </div>
    );
  }
}
