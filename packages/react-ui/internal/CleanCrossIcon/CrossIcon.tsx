import React from 'react';
import { XIcon16Light, XIcon20Light, XIcon24Regular } from '@skbkontur/icons/icons/XIcon';

import { iconSizer } from '../icons2022/iconSizer';

export const CrossIcon = iconSizer(
  {
    small: () => <XIcon16Light align="none" />,
    medium: () => <XIcon20Light align="none" />,
    large: () => <XIcon24Regular align="none" />,
  },
  'CrossIcon',
);
