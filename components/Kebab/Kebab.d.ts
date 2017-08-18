import * as React from 'react';

export interface KebabProps {
  disabled?: boolean,
  onClose?: () => void;
  onOpen?: () => void;
  size?: 'small' | 'large';
}

export interface KebabState {
  anchor: HTMLElement;
  focusedByTab: boolean;
  opened: boolean;
}

export default class Kebab extends React.Component<KebabProps, KebabState> {}
