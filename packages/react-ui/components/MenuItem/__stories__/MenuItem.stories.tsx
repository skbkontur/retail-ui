import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Meta } from '../../../typings/stories';
import { MenuItem } from '../MenuItem';

export default {
  title: 'MenuItem',
} as Meta;

export const MobileMenuItemWithIcon = () => {
  return (
    <MenuItem icon={<OkIcon />} isMobile>
      Мобильный айтем с иконкой
    </MenuItem>
  );
};
MobileMenuItemWithIcon.storyName = 'mobile menu item with icon';

export const MenuItemWithIcon = () => {
  return <MenuItem icon={<OkIcon />}>Меню айтем с иконкой</MenuItem>;
};
MenuItemWithIcon.storyName = 'menu item with icon';
MenuItemWithIcon.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/ },
  },
};

export const MenuItemWithBiggerFontSize = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <ThemeContext.Provider
          value={ThemeFactory.create({ menuItemFontSize: '18px', menuItemPaddingY: '8px' }, theme)}
        >
          <MenuItem icon={<OkIcon />}>Меню айтем с увеличенным размером шрифта</MenuItem>
        </ThemeContext.Provider>
      )}
    </ThemeContext.Consumer>
  );
};
MenuItemWithBiggerFontSize.storyName = 'menu item with bigger font size';
MenuItemWithBiggerFontSize.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/ },
  },
};
