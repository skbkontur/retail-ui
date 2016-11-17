// @flow

import type React from 'react';

export default function isActiveElement(element: ?React.Element<any>) {
  return element && element.type.__MENU_ITEM__ && !element.props.disabled;
}
