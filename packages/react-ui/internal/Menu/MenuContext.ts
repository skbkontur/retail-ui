import React from 'react';

import { emptyHandler } from '../../lib/utils';
import { MenuItem } from '../../components/MenuItem';

export interface MenuContextType {
  setHighlightedKey?: (key: string | undefined) => void;
  highlightedKey?: string | undefined;
  addMenuItem?: (key: string, item: MenuItem) => void;
  deleteMenuItem?: (key: string) => void;
  onMouseEnter?: any;
  onMouseLeave?: any;
  state?: any;
  onClick?: any;
  _enableIconPadding?: boolean;
}

const MenuContextDefault: MenuContextType = {
  setHighlightedKey: emptyHandler,
  highlightedKey: undefined,
  addMenuItem: emptyHandler,
  deleteMenuItem: emptyHandler,
  onMouseEnter: emptyHandler,
  onMouseLeave: emptyHandler,
  onClick: emptyHandler,
  state: '',
  _enableIconPadding: false,
};
export const MenuContext = React.createContext<MenuContextType>(MenuContextDefault);
