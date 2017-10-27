import * as React from 'react';

export interface ModalProps {
  children?: React.ReactNode;
  disableClose?: boolean;
  ignoreBackgroundClick?: boolean;
  noClose?: boolean;
  width?: number;
  onClose?: () => void;
}

export interface ModalState {
  shadowed: boolean;
}

export interface ModalHeaderProps {}

export interface ModalHeaderState {}

export interface ModalBodyProps {}

export interface ModalBodyState {}

export interface ModalFooterProps {
  panel?: boolean;
}

export interface ModalFooterState {}

declare class ModalHeader extends React.Component<
  ModalHeaderProps,
  ModalHeaderState
> {}

declare class ModalBody extends React.Component<
  ModalBodyProps,
  ModalBodyState
> {}

declare class ModalFooter extends React.Component<
  ModalFooterProps,
  ModalFooterState
> {}

export default class Modal extends React.Component<ModalProps, ModalState> {
  static Header: typeof ModalHeader;
  static Body: typeof ModalBody;
  static Footer: typeof ModalFooter;
}
