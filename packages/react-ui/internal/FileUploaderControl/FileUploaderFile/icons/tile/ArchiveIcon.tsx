import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { ArchiveIcon24Regular } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon24Regular';
import { ArchiveIcon32Regular } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon32Regular';
import { ArchiveIcon64Regular } from '../../../../icons2022/FileTypeArchiveIcon/ArchiveIcon64Regular';

export const ArchiveIcon = iconSizer(
  {
    small: () => <ArchiveIcon24Regular />,
    medium: () => <ArchiveIcon32Regular />,
    large: () => <ArchiveIcon64Regular />,
  },
  'ArchiveIcon',
);
