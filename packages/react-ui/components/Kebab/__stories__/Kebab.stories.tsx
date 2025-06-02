import React from 'react';
import { action } from '@storybook/addon-actions';
import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular';

import type { Meta, Story } from '../../../typings/stories';
import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';
import type { KebabProps } from '..';
import { MenuHeader } from '../../MenuHeader';

import { defaultItemsList, manyItemsList } from './Kebab.items';

interface KebabItem {
  text: string;
  action: string;
}

export default {
  title: 'Kebab',
  component: Kebab,
  decorators: [
    (Story: () => JSX.Element) => (
      <div
        style={{
          padding: '120px 0',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Small: Story = () => <SomethingWithKebab size="small" />;
Small.storyName = '14px';

export const Medium: Story = () => <SomethingWithKebab size="medium" />;
Medium.storyName = '18px';

export const Large: Story = () => <SomethingWithKebab size="large" />;
Large.storyName = '20px';

export const KebabWithCustomIcon: Story = () => {
  return (
    <>
      <SomethingWithKebab size="small" icon={<CheckAIcon16Regular color="#757575" />} />
      <SomethingWithKebab size="medium" icon={<CheckAIcon16Regular color="#757575" />} />
      <SomethingWithKebab size="large" icon={<CheckAIcon16Regular color="#757575" />} />
    </>
  );
};

export const LargeDisabled = () => <SomethingWithKebab size="large" disabled />;
LargeDisabled.storyName = '20px-disabled';
LargeDisabled.parameters = { creevey: { skip: true } };

export const WithFixedMenuHeight = () => (
  <SomethingWithKebab size="large" menuMaxHeight={'200px'} items={manyItemsList} />
);
WithFixedMenuHeight.storyName = 'With fixed menu height';
WithFixedMenuHeight.parameters = { creevey: { skip: true } };

export const KebabWithoutAnimations = () => <SomethingWithKebab disableAnimations size="small" />;
KebabWithoutAnimations.storyName = 'Kebab without animations';
KebabWithoutAnimations.parameters = { creevey: { skip: true } };

interface SomethingWithKebabProps {
  items?: KebabItem[];
  disableAnimations?: boolean;
  size: KebabProps['size'];
  disabled?: boolean;
  menuMaxHeight?: number | string;
  icon?: React.ReactNode;
}

class SomethingWithKebab extends React.Component<SomethingWithKebabProps> {
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
          icon={this.props.icon}
        >
          {menuItems}
        </Kebab>
      </div>
    );
  }
}

export const MobileExampleWithHorizontalPadding: Story = () => <SomethingWithKebab size="medium" />;

MobileExampleWithHorizontalPadding.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

export const WithItemsAndIcons: Story = () => (
  <div style={{ width: 200, textAlign: 'center' }}>
    <Kebab>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
      <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
  </div>
);

export const WithItemsAndIconsWithoutTextAlignment = () => (
  <div style={{ width: 200, textAlign: 'center' }}>
    <Kebab preventIconsOffset>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
      <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
  </div>
);
