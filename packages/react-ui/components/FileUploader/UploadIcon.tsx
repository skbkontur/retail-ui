/* eslint-disable react/display-name */
import React from 'react';

import { iconSizer } from '../../internal/icons2022/iconSizer';
import { NetUploadIcon16Light } from '../../internal/icons2022/NetUploadIcon16Light';
import { NetUploadIcon20Light } from '../../internal/icons2022/NetUploadIcon20Light';
import { NetUploadIcon24Regular } from '../../internal/icons2022/NetUploadIcon24Regular';

export const UploadIcon = iconSizer(
  {
    small: () => <NetUploadIcon16Light disableCompensation={false} />,
    medium: () => <NetUploadIcon20Light disableCompensation={false} />,
    large: () => <NetUploadIcon24Regular disableCompensation={false} />,
  },
  'UploadIcon',
);
