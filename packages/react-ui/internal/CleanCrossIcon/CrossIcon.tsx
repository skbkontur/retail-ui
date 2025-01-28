import React from 'react';
import { XCircleIcon16Solid, XCircleIcon20Solid, XCircleIcon24Solid } from '@skbkontur/icons/icons/XCircleIcon';

import { iconSizer } from '../icons2022/iconSizer';

export const CrossIcon = iconSizer(
  {
    small: () => <XCircleIcon16Solid align="none" />,
    medium: () => <XCircleIcon20Solid align="none" />,
    large: () => <XCircleIcon24Solid align="none" />,
  },
  'CrossIcon',
);
