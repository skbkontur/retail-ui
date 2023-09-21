import React from 'react';

import { MenuNavigation } from './MenuNavigation';

export interface MenuContextType {
  navigation: MenuNavigation | null;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export const MenuContext = React.createContext<MenuContextType>({
  navigation: new MenuNavigation(null),
});
