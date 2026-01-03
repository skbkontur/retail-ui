import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { ArchiveIcon16Solid } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon16Solid';
import { ArchiveIcon20Solid } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon20Solid';
import { ArchiveIcon24Solid } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon24Solid';

export const ArchiveIcon = iconSizer(
  {
    small: () => <ArchiveIcon16Solid />,
    medium: () => <ArchiveIcon20Solid />,
    large: () => <ArchiveIcon24Solid />,
  },
  'ArchiveIcon',
);
