import React from 'react';

import { UiMenuDots3HIcon16Regular } from '../../internal/icons2022/UiMenuDots3HIcon/UiMenuDots3HIcon16Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const DotsIcon = iconSizer(
  {
    small: () => <UiMenuDots3HIcon16Regular />,
    medium: () => <UiMenuDots3HIcon16Regular />,
    large: () => <UiMenuDots3HIcon16Regular />,
  },
  'DotsIcon',
);
