import React from 'react';
import AddIcon from '@skbkontur/react-icons/Add';
import BabyIcon from '@skbkontur/react-icons/Baby';

import { Button } from '../../Button';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Meta, Story } from '../../../typings/stories';
import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';
import { delay } from '../../../lib/utils';

export default {
  title: 'Dropdown',
  decorators: [
    (Story) => (
      <div className="dropdown-test-container" style={{ height: 150, width: 400, padding: 4, overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const SimpleDropdown: Story = () => (
  <Dropdown caption="Items">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);

export const WithFixedWidth: Story = () => (
  <Dropdown caption="Items" width={300}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithFixedWidth.storyName = 'With fixed width';
WithFixedWidth.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithOverflow = () => (
  <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width={100}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithOverflow.storyName = 'With overflow';
WithOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithIcon = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIcon.storyName = 'With icon';
WithIcon.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithMenuItemIcon: Story = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem icon={<AddIcon />}>Menu item</MenuItem>
    <MenuItem>Another item</MenuItem>
  </Dropdown>
);
WithMenuItemIcon.storyName = 'With MenuItem icon';

export const WithIconAndOverflow = () => (
  <Dropdown icon={<AddIcon />} caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100px">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIconAndOverflow.storyName = 'With icon and overflow';
WithIconAndOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const InsideScrollableContainer: Story = () => (
  <div style={{ height: '200%' }}>
    <Dropdown caption="Menu">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  </div>
);

export const WithCustomSelectTheme: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create({ selectBorderRadiusSmall: '12px', btnBorderRadiusSmall: '3px' }, theme)}
          >
            <Dropdown caption="Открыть">
              <Button>Кнопка</Button>
            </Dropdown>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
WithCustomSelectTheme.storyName = 'with custom select theme';
