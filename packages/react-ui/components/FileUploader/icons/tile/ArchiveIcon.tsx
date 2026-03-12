import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { ArchiveIcon24Regular } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon24Regular.js';
import { ArchiveIcon32Regular } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon32Regular.js';
import { ArchiveIcon64Regular } from '../../../../internal/icons2022/FileTypeArchiveIcon/ArchiveIcon64Regular.js';

export const ArchiveIcon = iconSizer(
  {
    small: () => <ArchiveIcon24Regular />,
    medium: () => <ArchiveIcon32Regular />,
    large: () => <ArchiveIcon64Regular />,
  },
  'ArchiveIcon',
);
