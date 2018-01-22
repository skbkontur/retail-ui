import * as React from 'react';

export interface ModalProps {
  children?: React.ReactNode;
  disableClose?: boolean;
  ignoreBackgroundClick?: boolean;
  noClose?: boolean;
  width?: number | string;
  onClose?: () => void;
}

export interface ModalState {
  shadowed: boolean;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
}

export interface ModalHeaderState {}

export interface ModalBodyProps {
  children: React.ReactNode;
}

export interface ModalBodyState {}

export interface ModalFooterProps {
  children: React.ReactNode;
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
