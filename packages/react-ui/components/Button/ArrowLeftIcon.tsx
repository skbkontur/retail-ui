/* eslint-disable react/display-name */
import React from 'react';

import { ArrowALeftIcon16Light } from '../../internal/icons2022/ArrowALeftIcon16Light';
import { ArrowALeftIcon20Light } from '../../internal/icons2022/ArrowALeftIcon20Light';
import { ArrowALeftIcon24Regular } from '../../internal/icons2022/ArrowALeftIcon24Regular';
import { iconSizer } from '../../internal/icons2022/iconSizer';

export const ArrowLeftIcon = iconSizer(
  {
    small: () => <ArrowALeftIcon16Light />,
    medium: () => <ArrowALeftIcon20Light />,
    large: () => <ArrowALeftIcon24Regular />,
  },
  'ArrowLeftIcon',
);
