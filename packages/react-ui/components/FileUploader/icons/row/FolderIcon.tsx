import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { FolderIcon16Solid } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon16Solid.js';
import { FolderIcon20Solid } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon20Solid.js';
import { FolderIcon24Solid } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon24Solid.js';

export const FolderIcon = iconSizer(
  {
    small: () => <FolderIcon16Solid />,
    medium: () => <FolderIcon20Solid />,
    large: () => <FolderIcon24Solid />,
  },
  'FolderIcon',
);
