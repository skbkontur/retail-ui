import React from 'react';

import { MenuItem } from '../MenuItem';

export class Item extends React.Component<{ children?: React.ReactNode }> {
  public render() {
    return <MenuItem>{this.props.children}</MenuItem>;
  }
}
