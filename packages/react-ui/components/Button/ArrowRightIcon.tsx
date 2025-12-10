import React from 'react';

import { ArrowARightIcon16Light } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon16Light.js';
import { ArrowARightIcon20Light } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon20Light.js';
import { ArrowARightIcon24Regular } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const ArrowRightIcon = iconSizer(
  {
    small: () => <ArrowARightIcon16Light />,
    medium: () => <ArrowARightIcon20Light />,
    large: () => <ArrowARightIcon24Regular />,
  },
  'ArrowRightIcon',
);
