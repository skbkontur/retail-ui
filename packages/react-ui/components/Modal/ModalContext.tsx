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
  setHasHeader?: (value?: boolean) => void;
  setHasFooter?: (value?: boolean) => void;
  setHasPanel?: (value?: boolean) => void;
  isMobileLayout: boolean;
}

export const ModalContext = React.createContext<ModalContextProps>({ isMobileLayout: false });

ModalContext.displayName = 'ModalContext';
