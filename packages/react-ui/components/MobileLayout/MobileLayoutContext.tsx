import React from 'react';

export enum LayoutMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}
export interface MobileLayoutContextProps {
  layout: LayoutMode;
}

export const MobileLayoutContext = React.createContext<MobileLayoutContextProps>({
  layout: LayoutMode.Desktop,
});

MobileLayoutContext.displayName = 'MobileLayoutContext';
