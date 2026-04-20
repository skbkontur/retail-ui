import React from 'react';

import { FolderIcon24Regular } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon24Regular.js';
import { FolderIcon32Regular } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon32Regular.js';
import { FolderIcon64Regular } from '../../../../internal/icons2022/FileTypeFolderIcon/FolderIcon64Regular.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const FolderIcon = iconSizer(
  {
    small: () => <FolderIcon24Regular />,
    medium: () => <FolderIcon32Regular />,
    large: () => <FolderIcon64Regular />,
  },
  'FolderIcon',
);
