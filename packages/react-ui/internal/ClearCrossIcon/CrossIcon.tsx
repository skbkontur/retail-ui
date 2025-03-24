import React from 'react';

import { iconSizer } from '../icons2022/iconSizer';
import { XIcon16Light } from '../icons2022/XIcon/XIcon16Light';
import { XIcon20Light } from '../icons2022/XIcon/XIcon20Light';
import { XIcon24Regular } from '../icons2022/XIcon/XIcon24Regular';

export const CrossIcon = iconSizer(
  {
    small: () => <XIcon16Light align="none" />,
    medium: () => <XIcon20Light align="none" />,
    large: () => <XIcon24Regular align="none" />,
  },
  'CrossIcon',
);
