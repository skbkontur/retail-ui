import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer.js';
import { TimeClockIcon16Light } from '../../internal/icons2022/TimeClockIcon/TimeClockIcon16Light.js';
import { TimeClockIcon20Light } from '../../internal/icons2022/TimeClockIcon/TimeClockIcon20Light.js';
import { TimeClockIcon24Regular } from '../../internal/icons2022/TimeClockIcon/TimeClockIcon24Regular.js';

export const TimeClockIcon = iconSizer(
  {
    small: () => <TimeClockIcon16Light />,
    medium: () => <TimeClockIcon20Light />,
    large: () => <TimeClockIcon24Regular />,
  },
  'TimeClockIcon',
);
