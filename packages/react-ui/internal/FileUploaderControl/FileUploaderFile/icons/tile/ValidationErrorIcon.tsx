import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { XCircleIcon24Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon24Regular';
import { XCircleIcon32Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon32Regular';
import { XCircleIcon64Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon64Regular';

export const ValidationErrorIcon = iconSizer(
  {
    small: () => <XCircleIcon24Regular />,
    medium: () => <XCircleIcon32Regular />,
    large: () => <XCircleIcon64Regular />,
  },
  'ValidationErrorIcon',
);
