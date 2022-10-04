import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Meta } from '../../../typings/stories';
import { MenuItem } from '../MenuItem';

export default {
  title: 'MenuItem',
} as Meta;

export const MobileMenuItemWithIcon = () => (
  <MenuItem icon={<OkIcon />} isMobile>
    Мобильный айтем с иконкой
  </MenuItem>
);
MobileMenuItemWithIcon.storyName = 'mobile menu item with icon';
