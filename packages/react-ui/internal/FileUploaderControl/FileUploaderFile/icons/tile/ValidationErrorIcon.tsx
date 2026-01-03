import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { XCircleIcon24Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon24Regular.js';
import { XCircleIcon32Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon32Regular.js';
import { XCircleIcon64Regular } from '../../../../icons2022/XCircleIcon/XCircleIcon64Regular.js';

export const ValidationErrorIcon = iconSizer(
  {
    small: () => <XCircleIcon24Regular />,
    medium: () => <XCircleIcon32Regular />,
    large: () => <XCircleIcon64Regular />,
  },
  'ValidationErrorIcon',
);
