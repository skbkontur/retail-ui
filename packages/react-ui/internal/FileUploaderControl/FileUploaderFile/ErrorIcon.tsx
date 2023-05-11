/* eslint-disable react/display-name */
import React from 'react';

import { iconSizer } from '../../icons2022/iconSizer';
import { MinusCircleIcon16Light } from '../../icons2022/MinusCircleIcon/MinusCircleIcon16Light';
import { MinusCircleIcon20Light } from '../../icons2022/MinusCircleIcon/MinusCircleIcon20Light';
import { MinusCircleIcon24Regular } from '../../icons2022/MinusCircleIcon/MinusCircleIcon24Regular';

export const ErrorIcon = iconSizer(
  {
    small: () => <MinusCircleIcon16Light disableCompensation={false} />,
    medium: () => <MinusCircleIcon20Light disableCompensation={false} />,
    large: () => <MinusCircleIcon24Regular disableCompensation={false} />,
  },
  'ErrorIcon',
);
