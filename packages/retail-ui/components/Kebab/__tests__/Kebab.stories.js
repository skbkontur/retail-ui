
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Kebab from '../Kebab';
import MenuItem from '../../MenuItem';
import { manyItemsList, defaultItemsList } from './Kebab.items';

type KebabItem = {
  text: string,
  action: string
};

storiesOf('Kebab', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '120px 0',
        border: '1px solid #dfdede',
        overflow: 'hidden'
      }}
    >
      {story()}
    </div>
  ))
  .add('14px', () => <SomethingWithKebab size="small" />)
  .add('20px', () => <SomethingWithKebab size="large" />)
  .add('20px-disabled', () => <SomethingWithKebab size="large" disabled />)
  .add('With fixed menu height', () => (
    <SomethingWithKebab
      size="large"
      menuMaxHeight={'200px'}
      items={manyItemsList}
    />
  ));

class SomethingWithKebab extends Component<{
  size: 'small' | 'large',
  disabled?: boolean,
  items?: KebabItem[],
  menuMaxHeight?: string | number
}> {
  render() {
    const itemsList = this.props.items || defaultItemsList;
    const menuItems = itemsList.map((item, index) => {
      return (
        <MenuItem key={index} onClick={action(item.action)}>
          {item.text}
        </MenuItem>
      );
    });

    return (
      <div style={{ width: 200, textAlign: 'center' }}>
        Pikachu{' '}
        <Kebab
          size={this.props.size}
          onOpen={action('open')}
          onClose={action('close')}
          disabled={this.props.disabled}
          menuMaxHeight={this.props.menuMaxHeight}
        >
          {menuItems}
        </Kebab>
      </div>
    );
  }
}
