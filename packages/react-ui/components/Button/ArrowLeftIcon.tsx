import React from 'react';

import { ArrowALeftIcon16Light } from '../../internal/icons2022/ArrowALeftIcon/ArrowALeftIcon16Light.js';
import { ArrowALeftIcon20Light } from '../../internal/icons2022/ArrowALeftIcon/ArrowALeftIcon20Light.js';
import { ArrowALeftIcon24Regular } from '../../internal/icons2022/ArrowALeftIcon/ArrowALeftIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const ArrowLeftIcon = iconSizer(
  {
    small: () => <ArrowALeftIcon16Light />,
    medium: () => <ArrowALeftIcon20Light />,
    large: () => <ArrowALeftIcon24Regular />,
  },
  'ArrowLeftIcon',
);
