import React from 'react';

import { CommonProps } from '../../internal/CommonWrapper';

export interface CloseProps extends CommonProps {
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
}

export const ModalContext = React.createContext<ModalContextProps>({});

ModalContext.displayName = 'ModalContext';
