import * as React from 'react';
import MenuItem, { MenuItemProps, isMenuItem } from '../../MenuItem';

export default function isActiveElement(element: any): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return isMenuItem(element) && !element.props.disabled;
}
