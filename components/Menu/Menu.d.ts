import * as React from 'react';

export interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number;
  onItemClick?: () => void;
  width?: number | string;
  preventWindowScroll?: boolean;
}

export interface MenuState {
  highlightedIndex: number;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  up(): void;
  down(): void;
  enter(event: React.SyntheticEvent<HTMLElement>): void;
  reset(): void;
}
