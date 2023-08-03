/* eslint-disable react/display-name */
import React from 'react';

import { ArrowCDownIcon16Regular } from '../icons2022/ArrowCDownIcon/ArrowCDownIcon16Regular';
import { ArrowCDownIcon20Regular } from '../icons2022/ArrowCDownIcon/ArrowCDownIcon20Regular';
import { ArrowCDownIcon24Regular } from '../icons2022/ArrowCDownIcon/ArrowCDownIcon24Regular';
import { iconSizer } from '../icons2022/iconSizer';

export const ArrowDownIcon = iconSizer(
  {
    small: () => <ArrowCDownIcon16Regular />,
    medium: () => <ArrowCDownIcon20Regular />,
    large: () => <ArrowCDownIcon24Regular />,
  },
  'ArrowDownIcon',
);
