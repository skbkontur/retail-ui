import React from 'react';
import { XCircleIcon16Light, XCircleIcon20Light, XCircleIcon24Regular } from '@skbkontur/icons/icons/XCircleIcon';

import { iconSizer } from '../icons2022/iconSizer';

export const CrossIcon = iconSizer(
  {
    small: () => <XCircleIcon16Light align="none" />,
    medium: () => <XCircleIcon20Light align="none" />,
    large: () => <XCircleIcon24Regular align="none" />,
  },
  'CrossIcon',
);
