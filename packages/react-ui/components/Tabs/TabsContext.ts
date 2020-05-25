import React from 'react';

import { emptyHandler } from '../../lib/utils';

import { Tab } from './Tab';

export interface TabsContextType {
  vertical: boolean;
  activeTab: string;
  getTab: (id: string) => Tab | null | void;
  addTab: (id: string, getNode: () => Tab) => void;
  notifyUpdate: () => void;
  removeTab: (id: string) => void;
  shiftFocus: (fromTab: string, delta: number) => void;
  switchTab: (id: string) => void;
}

export const TabsContextDefaultValue: TabsContextType = {
  vertical: false,
  activeTab: '',
  getTab: emptyHandler,
  addTab: emptyHandler,
  notifyUpdate: emptyHandler,
  removeTab: emptyHandler,
  shiftFocus: emptyHandler,
  switchTab: emptyHandler,
};
export const TabsContext = React.createContext<TabsContextType>(TabsContextDefaultValue);

TabsContext.displayName = 'TabsContext';
