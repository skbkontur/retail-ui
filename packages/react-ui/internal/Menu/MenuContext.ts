import React from 'react';

import type { MenuItem } from '../../components/MenuItem';

import type { MenuNavigation } from './MenuNavigation';

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
