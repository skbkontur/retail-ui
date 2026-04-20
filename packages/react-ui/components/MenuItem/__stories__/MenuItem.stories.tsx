import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular.js';
import React from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';
import type { Meta } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import { MenuItem } from '../MenuItem.js';

const meta: Meta = {
  title: 'MenuItem',
  component: MenuItem,
};

export default meta;

export const MobileMenuItemWithIcon = () => {
  return (
    <MenuItem icon={<CheckAIcon16Regular />} isMobile>
      Мобильный айтем с иконкой
    </MenuItem>
  );
};
MobileMenuItemWithIcon.storyName = 'mobile menu item with icon';

export const MenuItemWithIcon = () => {
  return <MenuItem icon={<CheckAIcon16Regular />}>Меню айтем с иконкой</MenuItem>;
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
          <MenuItem icon={<CheckAIcon16Regular />}>Меню айтем с увеличенным размером шрифта</MenuItem>
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
      <MenuItem icon={<CheckAIcon16Regular />} comment={comment}>
        Без размера
      </MenuItem>
      <MenuItem size={'small'} icon={<CheckAIcon16Regular />} comment={comment}>
        Маленький
      </MenuItem>
      <MenuItem size={'medium'} icon={<CheckAIcon16Regular />} comment={comment}>
        Средний
      </MenuItem>
      <MenuItem size={'large'} icon={<CheckAIcon16Regular />} comment={comment}>
        Большой
      </MenuItem>
    </Gapped>
  );
};
Size.storyName = 'size';
