import * as React from 'react';
import MenuHeader from '../../MenuHeader';
import MenuItem from '../../MenuItem';

export function isActiveElement(element: React.ReactChild) {
  if (typeof element === 'string' || typeof element === 'number') {
    return false;
  }

  return isMenuItem(element) && !element.props.disabled;
}

export function isMenuItem(element: React.ReactElement<any>): boolean {
  return !!element && element.type === MenuItem;
}

export function isMenuHeader(element: React.ReactElement<any>): boolean {
  return !!element && element.type === MenuHeader;
}
