import React from 'react';

import { Meta } from '../../../typings/stories';
import { OkIcon } from '../../icons/16px';
import { PopupMenu } from '../PopupMenu';
import { MenuItem } from '../../../components/MenuItem';
import { MenuHeader } from '../../../components/MenuHeader';
import { Button } from '../../../components/Button';

export default {
  title: 'PopupMenu',
  parameters: { creevey: { captureElement: '#popup_menu-test-container' } },
  decorators: [
    (Story) => (
      <div id="popup_menu-test-container" style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const WithItems = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);
WithItems.storyName = 'with Items';

export const WithItemsWithIcons = () => (
  <PopupMenu caption={<Button>Click me</Button>}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);

export const WithItemsWithIconsWithoutTextAlignment = () => (
  <PopupMenu caption={<Button>Click me</Button>} enableTextAlignment={false}>
    <MenuHeader>MenuHeader</MenuHeader>
    <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
    <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
    <MenuItem>MenuItem3</MenuItem>
  </PopupMenu>
);

WithItemsWithIconsWithoutTextAlignment.parameters = {
  creevey: { skip: { 'themes dont affect logic': { in: /^(?!\bchrome\b)/ } } },
};
