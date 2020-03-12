import React, { Component } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';

import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';

import { defaultItemsList, manyItemsList } from './Kebab.items';

interface KebabItem {
  text: string;
  action: string;
}

export default {
  title: 'Kebab',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div
        style={{
          padding: '120px 0',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export const Small = () => <SomethingWithKebab size="small" />;
Small.story = { name: '14px' };

export const Medium = () => <SomethingWithKebab size="medium" />;
Medium.story = { name: '18px' };

export const Large = () => <SomethingWithKebab size="large" />;
Large.story = { name: '20px' };

export const LargeDisabled = () => <SomethingWithKebab size="large" disabled />;
LargeDisabled.story = { name: '20px-disabled' };

export const WithFixedMenuHeight = () => (
  <SomethingWithKebab size="large" menuMaxHeight={'200px'} items={manyItemsList} />
);
WithFixedMenuHeight.story = { name: 'With fixed menu height' };

export const KebabWithoutAnimations = () => <SomethingWithKebab disableAnimations size="small" />;
KebabWithoutAnimations.story = { name: 'Kebab without animations' };

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
