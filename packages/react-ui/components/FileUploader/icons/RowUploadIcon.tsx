import React from 'react';

import { iconSizer } from '../../../internal/icons2022/iconSizer';
import { NetUploadIcon16Light } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon16Light';
import { NetUploadIcon20Regular } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon20Regular';
import { NetUploadIcon24Regular } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon24Regular';

export const UploadIcon = iconSizer(
  {
    small: () => <NetUploadIcon16Light />,
    medium: () => <NetUploadIcon20Regular />,
    large: () => <NetUploadIcon24Regular />,
  },
  'UploadIcon',
);
