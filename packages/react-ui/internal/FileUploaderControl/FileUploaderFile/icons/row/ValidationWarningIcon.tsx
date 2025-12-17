import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { WarningTriangleIcon16Solid } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon16Solid';
import { WarningTriangleIcon20Solid } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon20Solid';
import { WarningTriangleIcon24Solid } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon24Solid';

export const ValidationWarningIcon = iconSizer(
  {
    small: () => <WarningTriangleIcon16Solid />,
    medium: () => <WarningTriangleIcon20Solid />,
    large: () => <WarningTriangleIcon24Solid />,
  },
  'ValidationWarningIcon',
);
