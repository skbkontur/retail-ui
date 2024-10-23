import React from 'react';

import { iconSizer } from '../icons2022/iconSizer';
import { XCircleIcon16Solid, XCircleIcon20Solid, XCircleIcon24Solid } from '@skbkontur/icons/icons/XCircleIcon';

export const CrossIcon = iconSizer(
  {
    small: () => <XCircleIcon16Solid align="none" />,
    medium: () => <XCircleIcon20Solid align="none" />,
    large: () => <XCircleIcon24Solid align="none" />,
  },
  'CrossIcon',
);
