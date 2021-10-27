import React from 'react';

import { SidePageFooter } from './SidePageFooter';

export interface SidePageContextType {
  requestClose: () => void;
  getWidth: () => number | string;
  updateLayout: () => void;
  footerRef: (ref: SidePageFooter | null) => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasPanel?: boolean;
  footerHeight?: number;
  setHasHeader?: (value?: boolean) => void;
  setHasFooter?: (value?: boolean) => void;
  setHasPanel?: (value?: boolean) => void;
  setFooterHeight?: (value?: number) => void;
}

export const SidePageContext = React.createContext<SidePageContextType>({
  requestClose: () => undefined,
  getWidth: () => 'auto',
  updateLayout: () => undefined,
  footerRef: () => undefined,
});

SidePageContext.displayName = 'SidePageContext';
