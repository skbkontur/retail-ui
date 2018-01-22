import * as React from 'react';

export interface KebabProps {
  disabled?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  size?: 'small' | 'large';
  children?: React.ReactNode;
  menuMaxHeight?: number | string;
}

export interface KebabState {
  anchor: HTMLElement;
  focusedByTab: boolean;
  opened: boolean;
}

export default class Kebab extends React.Component<KebabProps, KebabState> {}
