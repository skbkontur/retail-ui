import React from 'react';

import { TableIcon24Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon24Regular.js';
import { TableIcon32Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon32Regular.js';
import { TableIcon64Regular } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon64Regular.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const TableIcon = iconSizer(
  {
    small: () => <TableIcon24Regular />,
    medium: () => <TableIcon32Regular />,
    large: () => <TableIcon64Regular />,
  },
  'TableIcon',
);
