import React from 'react';

import { CheckAIcon16Solid } from '../../internal/icons2022/CheckAIcon/CheckAIcon16Solid.js';
import { CheckAIcon20Solid } from '../../internal/icons2022/CheckAIcon/CheckAIcon20Solid.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const CheckedIcon = iconSizer(
  {
    small: () => <CheckAIcon16Solid size={12} />,
    medium: () => <CheckAIcon16Solid />,
    large: () => <CheckAIcon20Solid />,
  },
  'CheckedIcon',
);
