import React from 'react';
import MenuItem, { MenuItemProps } from '../MenuItem/MenuItem';

export default function isActiveElement(
  element: any
): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return (
    element &&
    element.type &&
    // FIXME: bad typings
    (element.type as any).__MENU_ITEM__ &&
    !element.props.disabled
  );
}
