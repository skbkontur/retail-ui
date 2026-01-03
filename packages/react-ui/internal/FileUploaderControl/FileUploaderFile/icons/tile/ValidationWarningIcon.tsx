import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { WarningTriangleIcon24Regular } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon24Regular.js';
import { WarningTriangleIcon32Regular } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon32Regular.js';
import { WarningTriangleIcon64Regular } from '../../../../icons2022/WarningTriangleIcon/WarningTriangleIcon64Regular.js';

export const ValidationWarningIcon = iconSizer(
  {
    small: () => <WarningTriangleIcon24Regular />,
    medium: () => <WarningTriangleIcon32Regular />,
    large: () => <WarningTriangleIcon64Regular />,
  },
  'ValidationWarningIcon',
);
