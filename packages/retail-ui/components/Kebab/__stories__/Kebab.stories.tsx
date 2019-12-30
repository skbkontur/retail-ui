import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';
import { defaultItemsList, manyItemsList } from './Kebab.items';

interface KebabItem {
  text: string;
  action: string;
}

storiesOf('Kebab', module)
  .addDecorator(story => (
    <div
      style={{
        padding: '120px 0',
        border: '1px solid #dfdede',
        overflow: 'hidden',
      }}
    >
      {story()}
    </div>
  ))
  .add('14px', () => <SomethingWithKebab size="small" />)
  .add('18px', () => <SomethingWithKebab size="medium" />)
  .add('20px', () => <SomethingWithKebab size="large" />)
  .add('20px-disabled', () => <SomethingWithKebab size="large" disabled />)
  .add('With fixed menu height', () => (
    <SomethingWithKebab size="large" menuMaxHeight={'200px'} items={manyItemsList} />
  ))
  .add('Kebab without animations', () => <SomethingWithKebab disableAnimations size="small" />);

class SomethingWithKebab extends Component<{
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  items?: KebabItem[];
  menuMaxHeight?: string | number;
  disableAnimations?: boolean;
}> {
  public render() {
    const itemsList = this.props.items || defaultItemsList;
    const menuItems = itemsList.map((item: KebabItem, index: number) => {
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
          disableAnimations={this.props.disableAnimations}
        >
          {menuItems}
        </Kebab>
      </div>
    );
  }
}
