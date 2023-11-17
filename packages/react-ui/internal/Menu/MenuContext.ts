import React from 'react';

import { MenuItem } from '../../components/MenuItem';

import { MenuNavigation } from './MenuNavigation';

export interface MenuContextType {
  navigation: MenuNavigation<MenuItem> | null;
  enableIconPadding: boolean;
  setEnableIconPadding?: () => void;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  preventIconsOffset?: boolean;
}

export const MenuContext = React.createContext<MenuContextType>({
  navigation: null,
  enableIconPadding: false,
});
