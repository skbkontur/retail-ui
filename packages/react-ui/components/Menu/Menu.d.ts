import * as React from 'react';

export interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number | string;
  onItemClick?: () => void;
  width?: number | string;
  preventWindowScroll?: boolean;
}

export interface MenuState {
  highlightedIndex: number;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  public up(): void;
  public down(): void;
  public enter(event: React.SyntheticEvent<HTMLElement>): void;
  public reset(): void;
}
