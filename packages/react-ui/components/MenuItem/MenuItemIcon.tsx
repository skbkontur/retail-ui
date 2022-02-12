import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { MenuItemProps } from './MenuItem';
import { styles } from './MenuItem.styles';

export type MenuItemIconProps = Pick<MenuItemProps, 'icon'>;

export const MenuItemIcon = ({ icon }: MenuItemIconProps) => {
  const theme = useContext(ThemeContext);

  return <div className={styles.icon(theme)}>{icon}</div>;
};
