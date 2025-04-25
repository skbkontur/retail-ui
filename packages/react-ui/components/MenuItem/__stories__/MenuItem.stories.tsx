import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import type { Meta } from '../../../typings/stories';
import { MenuItem } from '../MenuItem';
import { Gapped } from '../../Gapped';

export default {
  title: 'MenuItem',
  component: MenuItem,
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
    skip: { in: /^(?!\bchrome2022\b)/ },
  },
};

export const MenuItemWithBiggerFontSize = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <ThemeContext.Provider
          value={ThemeFactory.create({ menuItemFontSizeSmall: '18px', menuItemPaddingYSmall: '8px' }, theme)}
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
    skip: { in: /^(?!\bchrome2022\b)/ },
  },
};

export const Size = () => {
  const comment = <span>Комментарий</span>;
  return (
    <Gapped>
      <MenuItem icon={<OkIcon />} comment={comment}>
        Без размера
      </MenuItem>
      <MenuItem size={'small'} icon={<OkIcon />} comment={comment}>
        Маленький
      </MenuItem>
      <MenuItem size={'medium'} icon={<OkIcon />} comment={comment}>
        Средний
      </MenuItem>
      <MenuItem size={'large'} icon={<OkIcon />} comment={comment}>
        Большой
      </MenuItem>
    </Gapped>
  );
};
Size.storyName = 'size';
