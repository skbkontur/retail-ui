import React from 'react';

import { SidePageFooter } from './SidePageFooter';
import { SidePageHeader } from './SidePageHeader';

export interface SidePageContextType {
  requestClose: () => void;
  getWidth: () => number | string;
  updateLayout: () => void;
  headerRef: (ref: SidePageHeader | null) => void;
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
  headerRef: () => undefined,
  footerRef: () => undefined,
});

SidePageContext.displayName = 'SidePageContext';
