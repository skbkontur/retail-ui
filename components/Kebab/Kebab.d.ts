import * as React from 'react';

export interface KebabProps {
  size?: 'small' | 'large';
  onClose?: () => void;
  onOpen?: () => void;
}

export interface KebabState {
  anchor: HTMLElement;
  focusedByTab: boolean;
  opened: boolean;
}

export default class Kebab extends React.Component<KebabProps, KebabState> {}
