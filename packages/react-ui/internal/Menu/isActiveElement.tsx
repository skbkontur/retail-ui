import type React from 'react';

import type { MenuItem, MenuItemProps } from '../../components/MenuItem';
import { isMenuItem } from '../../components/MenuItem';

export function isActiveElement(element: any): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return isMenuItem(element) && !element.props.disabled && !element.props.isNotSelectable;
}
