import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { MenuItemProps } from './MenuItem';
import { styles } from './MenuItem.styles';

export type MenuItemIconProps = {
  children: MenuItemProps['icon'];
};

export const MenuItemIcon = ({ children }: MenuItemIconProps) => {
  const theme = useContext(ThemeContext);

  return <div className={styles.icon(theme)}>{children}</div>;
};
