import React from 'react';

import type { Meta, Story } from '../../../typings/stories';
import { CheckAIcon16Regular } from '../../../internal/icons2022/CheckAIcon/CheckAIcon16Regular';
import { PopupMenu } from '../PopupMenu';
import { MenuItem } from '../../../components/MenuItem';
import { MenuHeader } from '../../../components/MenuHeader';
import { Button } from '../../../components/Button';

export default {
  title: 'PopupMenu',
  decorators: [
    (Story: () => JSX.Element) => (
      <div
        style={{
          padding: 200,
          border: '1px solid #dfdede',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const WithItems: Story = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
WithItems.storyName = 'with Items';

export const WithItemsWithIcons: Story = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);

export const WithItemsWithIconsWithoutTextAlignment: Story = () => (
  <PopupMenu preventIconsOffset caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
    <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
