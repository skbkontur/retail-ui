/* eslint-disable react/display-name */
import React from 'react';

import { iconSizer } from '../../icons2022/iconSizer';
import { CheckAIcon16Light } from '../../icons2022/CheckAIcon/CheckAIcon16Light';
import { CheckAIcon20Light } from '../../icons2022/CheckAIcon/CheckAIcon20Light';
import { CheckAIcon24Regular } from '../../icons2022/CheckAIcon/CheckAIcon24Regular';

export const OkIcon = iconSizer(
  {
    small: () => <CheckAIcon16Light disableCompensation={false} />,
    medium: () => <CheckAIcon20Light disableCompensation={false} />,
    large: () => <CheckAIcon24Regular disableCompensation={false} />,
  },
  'OkIcon',
);
