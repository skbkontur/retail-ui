import * as React from 'react';

export interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number | string;
  width?: number | string;
  preventWindowScroll?: boolean;
  cyclicSelection?: boolean;
}

export interface MenuState {
  highlightedIndex: number;
}

export default class Menu extends React.Component<MenuProps, MenuState> {}
