import React from 'react';

import { iconSizer } from '../icons2022/iconSizer.js';
import { XIcon20Light } from '../icons2022/XIcon/XIcon20Light.js';
import { XIcon24Regular } from '../icons2022/XIcon/XIcon24Regular.js';

export const CrossIcon = iconSizer(
  {
    small: () => <XIcon20Light size={16} align="none" />,
    medium: () => <XIcon20Light align="none" />,
    large: () => <XIcon24Regular align="none" />,
  },
  'CrossIcon',
);
