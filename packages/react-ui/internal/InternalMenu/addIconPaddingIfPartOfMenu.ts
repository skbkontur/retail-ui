import React from 'react';

import { isMenuItem } from '../../components/MenuItem';
import { isMenuHeader } from '../../components/MenuHeader';

export const addIconPaddingIfPartOfMenu = (child: React.ReactNode, enableIconPadding: boolean) => {
  const isPartOfMenu = isMenuItem(child) || isMenuHeader(child);

  if (enableIconPadding && isPartOfMenu) {
    return React.cloneElement(child, {
      _enableIconPadding: true,
    });
  }

  return child;
};
