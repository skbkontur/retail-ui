import React from 'react';

import { ArrowARightIcon16Light } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon16Light';
import { ArrowARightIcon20Light } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon20Light';
import { ArrowARightIcon24Regular } from '../../internal/icons2022/ArrowARightIcon/ArrowARightIcon24Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const ArrowRightIcon = iconSizer(
  {
    small: () => <ArrowARightIcon16Light />,
    medium: () => <ArrowARightIcon20Light />,
    large: () => <ArrowARightIcon24Regular />,
  },
  'ArrowRightIcon',
);
