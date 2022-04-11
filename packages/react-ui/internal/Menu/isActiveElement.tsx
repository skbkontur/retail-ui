import React from 'react';

import { MenuItem, MenuItemProps, isMenuItem } from '../../components/MenuItem';

export function isActiveElement(element: React.ReactNode): element is React.ComponentElement<MenuItemProps, MenuItem> {
  return isMenuItem(element) && !element.props.disabled;
}
