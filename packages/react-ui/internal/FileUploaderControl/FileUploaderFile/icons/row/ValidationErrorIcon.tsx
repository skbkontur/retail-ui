import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { XCircleIcon16Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon16Solid';
import { XCircleIcon20Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon20Solid';
import { XCircleIcon24Solid } from '../../../../icons2022/XCircleIcon/XCircleIcon24Solid';

export const ValidationErrorIcon = iconSizer(
  {
    small: () => <XCircleIcon16Solid />,
    medium: () => <XCircleIcon20Solid />,
    large: () => <XCircleIcon24Solid />,
  },
  'ValidationErrorIcon',
);
