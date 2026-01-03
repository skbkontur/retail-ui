import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { FolderIcon24Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon24Regular.js';
import { FolderIcon32Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon32Regular.js';
import { FolderIcon64Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon64Regular.js';

export const FolderIcon = iconSizer(
  {
    small: () => <FolderIcon24Regular />,
    medium: () => <FolderIcon32Regular />,
    large: () => <FolderIcon64Regular />,
  },
  'FolderIcon',
);
