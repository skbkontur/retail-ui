import React from 'react';

import { MenuItem } from '../../components/MenuItem';

export interface MenuContextType {
  // menuItems: MenuItemContextType[];
  addMenuItem?: (key: MenuItemContextType['key'], item: MenuItemContextType['item']) => void;
  deleteMenuItem?: (key: MenuItemContextType['key']) => void;
  onClick?: (key: MenuItemContextType['key'], shouldHandleHref: boolean, event: React.MouseEvent<HTMLElement>) => void;
  highlightedKey?: MenuItemContextType['key'];
  setHighlightedKey?: (key?: MenuItemContextType['key']) => void;
  _enableIconPadding?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface MenuItemContextType {
  key: string;
  item: MenuItem;
}

export const MenuContext = React.createContext<MenuContextType>({});
