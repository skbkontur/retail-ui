// @flow
import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

class Item extends React.Component {
  render() {
    return <MenuItem>{this.props.children}</MenuItem>;
  }
}

export default Item;
