import React from 'react';
import { StoryFn } from '@storybook/addons';
import AddIcon from '@skbkontur/react-icons/Add';
import BabyIcon from '@skbkontur/react-icons/Baby';

import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';

export default {
  title: 'Dropdown',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div className="dropdown-test-container" style={{ height: 150, width: 400, padding: 4 }}>
        {story()}
      </div>
    ),
  ],
};

export const SimpleDropdown = () => (
  <Dropdown caption="Items">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);

export const WithFixedWidth = () => (
  <Dropdown caption="Items" width={300}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithFixedWidth.story = { name: 'With fixed width' };

export const WithOverflow = () => (
  <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width={100}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithOverflow.story = { name: 'With overflow' };

export const WithIcon = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIcon.story = { name: 'With icon' };

export const WithMenuItemIcon = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem icon={<AddIcon />}>Menu item</MenuItem>
    <MenuItem>Another item</MenuItem>
  </Dropdown>
);
WithMenuItemIcon.story = { name: 'With MenuItem icon' };

export const WithIconAndOverflow = () => (
  <Dropdown icon={<AddIcon />} caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100px">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIconAndOverflow.story = { name: 'With icon and overflow' };
