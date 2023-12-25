import React from 'react';

import { MenuItem } from '../../components/MenuItem';

import { MenuNavigation } from './MenuNavigation';

export interface MenuContextType {
  navigation: MenuNavigation<MenuItem> | null;
  enableIconPadding: boolean;
  setEnableIconPadding?: (isIconPaddingEnabled: boolean) => void;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export const MenuContext = React.createContext<MenuContextType>({
  navigation: null,
  enableIconPadding: false,
});
