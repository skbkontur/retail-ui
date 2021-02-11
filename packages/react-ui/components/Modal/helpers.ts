import React from 'react';

import { ModalFooterProps } from './ModalFooter';
import { ModalHeaderProps } from './ModalHeader';

export function isFooter(child: React.ReactNode): child is React.ReactElement<ModalFooterProps> {
  return (
    React.isValidElement<ModalFooterProps>(child) &&
    Object.prototype.hasOwnProperty.call(child.type, '__MODAL_FOOTER__')
  );
}
export function isHeader(child: React.ReactNode): child is React.ReactElement<ModalHeaderProps> {
  return (
    React.isValidElement<ModalHeaderProps>(child) &&
    Object.prototype.hasOwnProperty.call(child.type, '__MODAL_HEADER__')
  );
}
export function isBody(child: React.ReactNode): child is React.ReactElement<{}> {
  return React.isValidElement(child) && Object.prototype.hasOwnProperty.call(child.type, '__MODAL_BODY__');
}
