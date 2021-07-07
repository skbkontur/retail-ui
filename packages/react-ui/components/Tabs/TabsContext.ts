import React from 'react';

import { emptyHandler } from '../../lib/utils';

import { Tab } from './Tab';

export interface TabsContextType<T> {
  vertical: boolean;
  activeTab: T;
  getTab: (id: T) => Tab | null | void;
  addTab: (id: T, getNode: () => Tab) => void;
  notifyUpdate: () => void;
  removeTab: (id: T) => void;
  shiftFocus: (fromTab: T, delta: number) => void;
  switchTab: (id: T) => void;
}

export const TabsContextDefaultValue: TabsContextType<any> = {
  vertical: false,
  activeTab: '',
  getTab: emptyHandler,
  addTab: emptyHandler,
  notifyUpdate: emptyHandler,
  removeTab: emptyHandler,
  shiftFocus: emptyHandler,
  switchTab: emptyHandler,
};
export const TabsContext = React.createContext<TabsContextType<any>>(TabsContextDefaultValue);

TabsContext.displayName = 'TabsContext';
