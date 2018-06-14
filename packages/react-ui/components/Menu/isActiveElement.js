// @flow

import type { Element } from 'react';
import type MenuItem from '../MenuItem/MenuItem';

export default function isActiveElement(
  element: ?Element<Class<MenuItem>>
): %checks {
  return (
    element &&
    element.type &&
    element.type.__MENU_ITEM__ &&
    !element.props.disabled
  );
}
