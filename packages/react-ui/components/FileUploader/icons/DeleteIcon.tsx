import React from 'react';

import { iconSizer } from '../../../internal/icons2022/iconSizer.js';
import { XIcon16Light } from '../../../internal/icons2022/XIcon/XIcon16Light.js';
import { XIcon20Light } from '../../../internal/icons2022/XIcon/XIcon20Light.js';
import { XIcon24Regular } from '../../../internal/icons2022/XIcon/XIcon24Regular.js';

export const DeleteIcon = iconSizer(
  {
    small: () => <XIcon16Light />,
    medium: () => <XIcon20Light />,
    large: () => <XIcon24Regular />,
  },
  'DeleteIcon',
);
