import React from 'react';

import { CalendarIcon16Light } from '../../internal/icons2022/CalendarIcon/CalendarIcon16Light.js';
import { CalendarIcon20Light } from '../../internal/icons2022/CalendarIcon/CalendarIcon20Light.js';
import { CalendarIcon24Regular } from '../../internal/icons2022/CalendarIcon/CalendarIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const CalendarIcon = iconSizer(
  {
    small: () => <CalendarIcon16Light />,
    medium: () => <CalendarIcon20Light />,
    large: () => <CalendarIcon24Regular />,
  },
  'CalendarIcon',
);
