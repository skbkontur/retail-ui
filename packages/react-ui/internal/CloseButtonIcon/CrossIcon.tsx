import React from 'react';

import { iconSizer } from '../icons2022/iconSizer';
import { XIcon20Light } from '../icons2022/XIcon/XIcon20Light';
import { XIcon24Regular } from '../icons2022/XIcon/XIcon24Regular';

export const CrossIcon = iconSizer(
  {
    small: () => <XIcon20Light size={16} align="none" />,
    medium: () => <XIcon20Light align="none" />,
    large: () => <XIcon24Regular align="none" />,
  },
  'CrossIcon',
);
