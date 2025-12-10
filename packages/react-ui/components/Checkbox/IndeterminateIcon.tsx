import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer.js';
import { ShapeSquareIcon16Solid } from '../../internal/icons2022/ShapeSquareIcon/ShapeSquareIcon16Solid.js';

export const IndeterminateIcon = iconSizer(
  {
    small: () => <ShapeSquareIcon16Solid size={6} />,
    medium: () => <ShapeSquareIcon16Solid size={8} />,
    large: () => <ShapeSquareIcon16Solid size={10} />,
  },
  'IndeterminateIcon',
);
