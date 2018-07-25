import * as React from 'react';
import MenuItem, { MenuItemProps } from '../../MenuItem';

export default function isActiveElement(
  element: any
): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return (
    element &&
    element.type &&
    // FIXME: bad typings
    element.type === MenuItem &&
    !element.props.disabled
  );
}
