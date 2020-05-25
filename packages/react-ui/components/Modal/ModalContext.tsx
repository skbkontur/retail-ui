import React from 'react';

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

export const ModalContext = React.createContext<ModalContextProps>({});

ModalContext.displayName = 'ModalContext';
