import React from 'react';

import { MenuItem } from '../MenuItem';

interface ItemProps {
  children?: React.ReactNode;
  isNotSelectable?: boolean;
}
export class Item extends React.Component<ItemProps> {
  public static __KONTUR_REACT_UI__ = 'SelectItem';

  public render() {
    return <MenuItem isNotSelectable={this.props.isNotSelectable}>{this.props.children}</MenuItem>;
  }
}
