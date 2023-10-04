import React from 'react';

import { MenuItem } from '../../components/MenuItem';

import { MenuNavigation } from './MenuNavigation';

export interface MenuContextType {
  navigation: MenuNavigation<MenuItem> | null;
  enableIconPadding: boolean;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export const MenuContext = React.createContext<MenuContextType>({
  navigation: new MenuNavigation(null),
  enableIconPadding: false,
});
