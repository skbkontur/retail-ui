import React from 'react';

import { SidePageFooterProps } from './SidePageFooter';
import { SidePageHeaderProps } from './SidePageHeader';

export function isFooter(child: React.ReactNode): child is React.ReactElement<SidePageFooterProps> {
  return (
    React.isValidElement<SidePageFooterProps>(child) &&
    Object.prototype.hasOwnProperty.call(child.type, '__SIDEPAGE_FOOTER__')
  );
}
export function isHeader(child: React.ReactNode): child is React.ReactElement<SidePageHeaderProps> {
  return (
    React.isValidElement<SidePageHeaderProps>(child) &&
    Object.prototype.hasOwnProperty.call(child.type, '__SIDEPAGE_HEADER__')
  );
}
export function isBody(child: React.ReactNode): child is React.ReactElement<{}> {
  return React.isValidElement(child) && Object.prototype.hasOwnProperty.call(child.type, '__SIDEPAGE_BODY__');
}
