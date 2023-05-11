/* eslint-disable react/display-name */
import React from 'react';

import { ArrowCDownIcon16Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon16Regular';
import { ArrowCDownIcon20Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon20Regular';
import { ArrowCDownIcon24Regular } from '../../internal/icons2022/ArrowCDownIcon/ArrowCDownIcon24Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const ArrowDownIcon = iconSizer(
  {
    small: () => <ArrowCDownIcon16Regular disableCompensation={false} />,
    medium: () => <ArrowCDownIcon20Regular disableCompensation={false} />,
    large: () => <ArrowCDownIcon24Regular disableCompensation={false} />,
  },
  'ArrowDownIcon',
);
