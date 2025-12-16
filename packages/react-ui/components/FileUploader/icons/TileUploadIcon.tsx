import React from 'react';

import { iconSizer } from '../../../internal/icons2022/iconSizer';
import { NetUploadIcon20Regular } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon20Regular';
import { NetUploadIcon24Regular } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon24Regular';
import { NetUploadIcon32Regular } from '../../../internal/icons2022/NetUploadIcon/NetUploadIcon32Regular';

export const UploadIcon = iconSizer(
  {
    small: () => <NetUploadIcon20Regular />,
    medium: () => <NetUploadIcon24Regular />,
    large: () => <NetUploadIcon32Regular />,
  },
  'UploadIcon',
);
