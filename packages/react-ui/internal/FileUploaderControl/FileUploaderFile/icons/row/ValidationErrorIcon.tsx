import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { XCircleIcon16Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon16Solid.js';
import { XCircleIcon20Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon20Solid.js';
import { XCircleIcon24Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon24Solid.js';

export const ValidationErrorIcon = iconSizer(
  {
    small: () => <XCircleIcon16Solid />,
    medium: () => <XCircleIcon20Solid />,
    large: () => <XCircleIcon24Solid />,
  },
  'ValidationErrorIcon',
);
