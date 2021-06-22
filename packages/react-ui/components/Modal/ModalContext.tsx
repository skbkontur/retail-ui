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
  setHasHeader?: () => void;
  setHasFooter?: () => void;
  setHasPanel?: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({});

ModalContext.displayName = 'ModalContext';
