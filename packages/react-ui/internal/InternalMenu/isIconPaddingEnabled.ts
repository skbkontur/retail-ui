import React from 'react';

import { InternalMenuProps } from './InternalMenu';

export const isIconPaddingEnabled = (
  children: InternalMenuProps['children'],
  preventIconsOffset: InternalMenuProps['preventIconsOffset'],
) =>
  Boolean(!preventIconsOffset && React.Children.toArray(children).some((x) => React.isValidElement(x) && x.props.icon));
