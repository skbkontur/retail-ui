import React from 'react';

import { MenuItem } from '../MenuItem';

interface ItemProps { children?: React.ReactNode }
export class Item extends React.Component<ItemProps> {
  public static __KONTUR_REACT_UI__ = 'SelectItem';

  public render() {
    return <MenuItem>{this.props.children}</MenuItem>;
  }
}
