import React from 'react';

import { iconSizer } from '../../icons2022/iconSizer';
import { CheckAIcon16Light } from '../../icons2022/CheckAIcon/CheckAIcon16Light';
import { CheckAIcon20Light } from '../../icons2022/CheckAIcon/CheckAIcon20Light';
import { CheckAIcon24Regular } from '../../icons2022/CheckAIcon/CheckAIcon24Regular';

export const OkIcon = iconSizer(
  {
    small: () => <CheckAIcon16Light />,
    medium: () => <CheckAIcon20Light />,
    large: () => <CheckAIcon24Regular />,
  },
  'OkIcon',
);
