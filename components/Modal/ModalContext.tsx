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
