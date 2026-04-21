import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { action } from '@storybook/addon-actions';
import React, { type JSX } from 'react';

import type { Meta, Story } from '../../../typings/stories.js';
import { MenuHeader } from '../../MenuHeader/index.js';
import { MenuItem } from '../../MenuItem/index.js';
import type { KebabProps } from '../index.js';
import { Kebab } from '../Kebab.js';
import { defaultItemsList, manyItemsList } from './Kebab.items.js';

interface KebabItem {
  text: string;
  action: string;
}

const meta: Meta = {
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
};

export default meta;

export const Small: Story = () => <SomethingWithKebab size="small" />;
Small.storyName = '14px';

export const Medium: Story = () => <SomethingWithKebab size="medium" />;
Medium.storyName = '18px';

export const Large: Story = () => <SomethingWithKebab size="large" />;
Large.storyName = '20px';

export const KebabWithCustomIcon: Story = () => {
  return (
    <>
      <SomethingWithKebab size="small" icon={<IconCheckARegular16 color="#757575" />} />
      <SomethingWithKebab size="medium" icon={<IconCheckARegular16 color="#757575" />} />
      <SomethingWithKebab size="large" icon={<IconCheckARegular16 color="#757575" />} />
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
      <MenuItem icon={<IconCheckARegular16 />}>MenuItem1</MenuItem>
      <MenuItem icon={<IconCheckARegular16 />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
  </div>
);

export const WithItemsAndIconsWithoutTextAlignment = () => (
  <div style={{ width: 200, textAlign: 'center' }}>
    <Kebab preventIconsOffset>
      <MenuHeader>MenuHeader</MenuHeader>
      <MenuItem icon={<IconCheckARegular16 />}>MenuItem1</MenuItem>
      <MenuItem icon={<IconCheckARegular16 />}>MenuItem2</MenuItem>
      <MenuItem>MenuItem3</MenuItem>
    </Kebab>
  </div>
);
