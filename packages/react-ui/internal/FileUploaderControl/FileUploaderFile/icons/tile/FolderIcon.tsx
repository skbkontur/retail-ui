import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { FolderIcon24Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon24Regular';
import { FolderIcon32Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon32Regular';
import { FolderIcon64Regular } from '../../../../icons2022/FileTypeFolderIcon/FolderIcon64Regular';

export const FolderIcon = iconSizer(
  {
    small: () => <FolderIcon24Regular />,
    medium: () => <FolderIcon32Regular />,
    large: () => <FolderIcon64Regular />,
  },
  'FolderIcon',
);
