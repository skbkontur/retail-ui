import React from 'react';

import { SidePageHeader } from './SidePageHeader';
import { SidePageFooter } from './SidePageFooter';

export interface SidePageContextType {
  requestClose: () => void;
  getWidth: () => number | string;
  updateLayout: () => void;
  headerRef: (ref: SidePageHeader | null) => void;
  footerRef: (ref: SidePageFooter | null) => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasPanel?: boolean;
}

export const SidePageContext = React.createContext<SidePageContextType>({
  requestClose: () => undefined,
  getWidth: () => 'auto',
  updateLayout: () => undefined,
  headerRef: () => undefined,
  footerRef: () => undefined,
});

SidePageContext.displayName = 'SidePageContext';
