import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { NetUploadIcon20Regular } from '../../../../internal/icons2022/NetUploadIcon/NetUploadIcon20Regular.js';
import { NetUploadIcon24Regular } from '../../../../internal/icons2022/NetUploadIcon/NetUploadIcon24Regular.js';
import { NetUploadIcon32Regular } from '../../../../internal/icons2022/NetUploadIcon/NetUploadIcon32Regular.js';

export const UploadIcon = iconSizer(
  {
    small: () => <NetUploadIcon20Regular />,
    medium: () => <NetUploadIcon24Regular />,
    large: () => <NetUploadIcon32Regular />,
  },
  'UploadIcon',
);
