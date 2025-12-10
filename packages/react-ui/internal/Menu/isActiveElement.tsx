import type React from 'react';

import type { MenuItem, MenuItemProps } from '../../components/MenuItem/index.js';
import { isMenuItem } from '../../components/MenuItem/index.js';

export function isActiveElement(element: any): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return isMenuItem(element) && !element.props.disabled && !element.props.isNotSelectable;
}
