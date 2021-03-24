import React from 'react';

import { isReactUIComponent } from '../../lib/utils';

import { SidePageFooterProps } from './SidePageFooter';
import { SidePageHeaderProps } from './SidePageHeader';

export const isFooter = (component: React.ReactNode): component is React.Component<SidePageFooterProps> => {
  return isReactUIComponent('SidePageFooter', component);
};

export const isHeader = (component: React.ReactNode): component is React.Component<SidePageHeaderProps> => {
  return isReactUIComponent('SidePageHeader', component);
};
