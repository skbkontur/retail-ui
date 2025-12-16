import React from 'react';

import { iconSizer } from '../../../icons2022/iconSizer';
import { XIcon16Light } from '../../../icons2022/XIcon/XIcon16Light';
import { XIcon20Light } from '../../../icons2022/XIcon/XIcon20Light';
import { XIcon24Regular } from '../../../icons2022/XIcon/XIcon24Regular';

export const DeleteIcon = iconSizer(
  {
    small: () => <XIcon16Light />,
    medium: () => <XIcon20Light />,
    large: () => <XIcon24Regular />,
  },
  'DeleteIcon',
);
