/* eslint-disable react/display-name */
import React from 'react';

import { CalendarIcon16Light } from '../../internal/icons2022/CalendarIcon/CalendarIcon16Light';
import { CalendarIcon20Light } from '../../internal/icons2022/CalendarIcon/CalendarIcon20Light';
import { CalendarIcon24Regular } from '../../internal/icons2022/CalendarIcon/CalendarIcon24Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const CalendarIcon = iconSizer(
  {
    small: () => <CalendarIcon16Light disableCompensation={false} />,
    medium: () => <CalendarIcon20Light disableCompensation={false} />,
    large: () => <CalendarIcon24Regular disableCompensation={false} />,
  },
  'CalendarIcon',
);
