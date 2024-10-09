import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer';
import { ShapeSquareIcon16Solid } from '../../internal/icons2022/ShapeSquareIcon/ShapeSquareIcon16Solid';

export const IndeterminateIcon = iconSizer(
  {
    small: () => <ShapeSquareIcon16Solid size={6} />,
    medium: () => <ShapeSquareIcon16Solid size={8} />,
    large: () => <ShapeSquareIcon16Solid size={10} />,
  },
  'IndeterminateIcon',
);
