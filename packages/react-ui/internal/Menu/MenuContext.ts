import React from 'react';

export interface MenuContextType {
  enableIconPadding: boolean;
}

export const MenuContext = React.createContext<MenuContextType>({
  enableIconPadding: false,
});
