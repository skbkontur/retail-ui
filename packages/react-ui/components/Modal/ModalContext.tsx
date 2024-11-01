import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper';

export interface CloseProps extends CommonProps {
  /** Отключает событие onClose, также дизейблит кнопку закрытия модалки. */
  disableClose?: boolean;

  /** Задает функцию, которая вызывается при клике по крестику или снаружи. */
  requestClose: () => void;
}

export interface ModalContextProps {
  additionalPadding?: boolean;
  hasHeader?: boolean;
  close?: CloseProps;
  horizontalScroll?: boolean;
  setHasHeader?: (value: boolean) => void;
  setHasFooter?: (value: boolean) => void;
  setHasPanel?: (value: boolean) => void;
}

export const ModalContext = React.createContext<ModalContextProps>({});

ModalContext.displayName = 'ModalContext';
