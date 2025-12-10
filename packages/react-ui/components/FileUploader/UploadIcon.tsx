import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer.js';
import { NetUploadIcon16Light } from '../../internal/icons2022/NetUploadIcon/NetUploadIcon16Light.js';
import { NetUploadIcon20Light } from '../../internal/icons2022/NetUploadIcon/NetUploadIcon20Light.js';
import { NetUploadIcon24Regular } from '../../internal/icons2022/NetUploadIcon/NetUploadIcon24Regular.js';

export const UploadIcon = iconSizer(
  {
    small: () => <NetUploadIcon16Light />,
    medium: () => <NetUploadIcon20Light />,
    large: () => <NetUploadIcon24Regular />,
  },
  'UploadIcon',
);
