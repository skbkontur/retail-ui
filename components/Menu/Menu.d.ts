import * as React from 'react';

export interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number;
  onItemClick?: () => void;
  width?: number | string;
}

export interface MenuState {
  highlightedIndex: number;
}

export default class Menu extends React.Component<MenuProps, MenuState> {}
