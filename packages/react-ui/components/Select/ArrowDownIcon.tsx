import React from 'react';

import { ArrowCDownIcon16Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon16Regular.js';
import { ArrowCDownIcon20Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon20Regular.js';
import { ArrowCDownIcon24Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const ArrowDownIcon = iconSizer(
  {
    small: () => <ArrowCDownIcon16Regular />,
    medium: () => <ArrowCDownIcon20Regular />,
    large: () => <ArrowCDownIcon24Regular />,
  },
  'ArrowDownIcon',
);
