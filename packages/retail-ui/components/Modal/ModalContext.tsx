// FIXME: remove after upgrading ts to 2.9.1
// @ts-ignore Used for generating declarations
import React from 'react';
import createReactContext from 'create-react-context';

export interface CloseProps {
  disableClose?: boolean;
  requestClose: () => void;
}

export interface ModalContextProps {
  additionalPadding?: boolean;
  hasHeader?: boolean;
  close?: CloseProps;
  horizontalScroll?: boolean;
}

export const ModalContext = createReactContext<ModalContextProps>({});
