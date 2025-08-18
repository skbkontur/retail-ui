import React from 'react';

import { UiMenuDots3HIcon16Regular } from '../../internal/icons2022/UiMenuDots3HIcon/UiMenuDots3HIcon16Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const DotsIcon = iconSizer(
  {
    small: () => <UiMenuDots3HIcon16Regular />,
    medium: () => <UiMenuDots3HIcon16Regular />,
    large: () => <UiMenuDots3HIcon16Regular />,
  },
  'DotsIcon',
);
