// FIXME: remove after upgrading ts to 2.9.1
// @ts-ignore Used for generating declarations
import * as React from 'react';
import createReactContext = require('create-react-context');

export interface CloseProps {
  disableClose?: boolean;
  requestClose: () => void;
}

export interface ModalContextProps {
  close?: CloseProps;
  horizontalScroll?: boolean;
}

export const ModalContext = createReactContext<ModalContextProps>({});
