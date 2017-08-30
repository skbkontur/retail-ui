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
  .add('20px', () => <SomethingWithKebab size="large" />);

class SomethingWithKebab extends Component<{ size: 'small' | 'large' }> {
  render() {
    return (
      <div style={{ width: 200, textAlign: 'center' }}>
        Pikachu{' '}
        <Kebab
          size={this.props.size}
          onOpen={action('open')}
          onClose={action('close')}
        >
          <MenuItem onClick={action('First')}>First</MenuItem>
          <MenuItem onClick={action('Second')}>Second</MenuItem>
          <MenuItem onClick={action('Uno')}>Uno</MenuItem>
        </Kebab>
      </div>
    );
  }
}
