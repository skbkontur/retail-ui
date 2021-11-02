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
  setHasHeader?: (value?: boolean) => void;
  setHasFooter?: (value?: boolean) => void;
  setHasPanel?: (value?: boolean) => void;
}

export const SidePageContext = React.createContext<SidePageContextType>({
  requestClose: () => undefined,
  getWidth: () => 'auto',
  updateLayout: () => undefined,
  footerRef: () => undefined,
});

SidePageContext.displayName = 'SidePageContext';
