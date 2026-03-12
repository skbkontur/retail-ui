import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { ArchiveIcon16Solid } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon16Solid.js';
import { ArchiveIcon20Solid } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon20Solid.js';
import { ArchiveIcon24Solid } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon24Solid.js';

export const ArchiveIcon = iconSizer(
  {
    small: () => <ArchiveIcon16Solid />,
    medium: () => <ArchiveIcon20Solid />,
    large: () => <ArchiveIcon24Solid />,
  },
  'ArchiveIcon',
);
