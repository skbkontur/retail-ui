import React from 'react';

import { iconSizer } from '../../icons2022/iconSizer.js';
import { XIcon16Light } from '../../icons2022/XIcon/XIcon16Light.js';
import { XIcon20Light } from '../../icons2022/XIcon/XIcon20Light.js';
import { XIcon24Regular } from '../../icons2022/XIcon/XIcon24Regular.js';

export const DeleteIcon = iconSizer(
  {
    small: () => <XIcon16Light />,
    medium: () => <XIcon20Light />,
    large: () => <XIcon24Regular />,
  },
  'DeleteIcon',
);
