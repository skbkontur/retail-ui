import React from 'react';

import { isReactUINode } from '../../lib/utils';

import { SidePageFooterProps } from './SidePageFooter';
import { SidePageHeaderProps } from './SidePageHeader';

export const isFooter = (component: React.ReactNode): component is React.Component<SidePageFooterProps> => {
  return isReactUINode('SidePageFooter', component);
};

export const isHeader = (component: React.ReactNode): component is React.Component<SidePageHeaderProps> => {
  return isReactUINode('SidePageHeader', component);
};
