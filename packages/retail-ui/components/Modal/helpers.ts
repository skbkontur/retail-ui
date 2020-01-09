import * as React from 'react';

import { FooterProps } from './ModalFooter';
import { HeaderProps } from './ModalHeader';

export function isFooter(child: React.ReactNode): child is React.ReactElement<FooterProps> {
  return React.isValidElement<FooterProps>(child) && child.type.hasOwnProperty('__MODAL_FOOTER__');
}
export function isHeader(child: React.ReactNode): child is React.ReactElement<HeaderProps> {
  return React.isValidElement<HeaderProps>(child) && child.type.hasOwnProperty('__MODAL_HEADER__');
}
export function isBody(child: React.ReactNode): child is React.ReactElement<{}> {
  return React.isValidElement(child) && child.type.hasOwnProperty('__MODAL_BODY__');
}
