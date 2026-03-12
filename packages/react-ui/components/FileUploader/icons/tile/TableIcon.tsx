import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { TableIcon24Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon24Regular.js';
import { TableIcon32Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon32Regular.js';
import { TableIcon64Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon64Regular.js';

export const TableIcon = iconSizer(
  {
    small: () => <TableIcon24Regular />,
    medium: () => <TableIcon32Regular />,
    large: () => <TableIcon64Regular />,
  },
  'TableIcon',
);
