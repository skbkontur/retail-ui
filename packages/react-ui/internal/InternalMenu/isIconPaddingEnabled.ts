import React from 'react';

import { InternalMenuProps } from './InternalMenu';

export const isIconPaddingEnabled = (
  children: InternalMenuProps['children'],
  enableTextAlignment: InternalMenuProps['enableTextAlignment'],
) =>
  Boolean(enableTextAlignment && React.Children.toArray(children).some((x) => React.isValidElement(x) && x.props.icon));
