import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { FolderIcon16Solid } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon16Solid';
import { FolderIcon20Solid } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon20Solid';
import { FolderIcon24Solid } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon24Solid';

export const FolderIcon = iconSizer(
  {
    small: () => <FolderIcon16Solid />,
    medium: () => <FolderIcon20Solid />,
    large: () => <FolderIcon24Solid />,
  },
  'FolderIcon',
);
