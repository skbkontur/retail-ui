import React from 'react';

import { MenuNavigation } from './MenuNavigation';

export interface MenuContextType {
  navigation: MenuNavigation | null;
}

export const MenuContext = React.createContext<MenuContextType>({
  navigation: new MenuNavigation(null),
});
