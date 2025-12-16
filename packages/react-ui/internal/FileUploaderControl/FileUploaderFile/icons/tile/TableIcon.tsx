import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { TableIcon24Regular } from '../../../../icons2022/FileTypeTableIcon/TableIcon24Regular';
import { TableIcon32Regular } from '../../../../icons2022/FileTypeTableIcon/TableIcon32Regular';
import { TableIcon64Regular } from '../../../../icons2022/FileTypeTableIcon/TableIcon64Regular';

export const TableIcon = iconSizer(
  {
    small: () => <TableIcon24Regular />,
    medium: () => <TableIcon32Regular />,
    large: () => <TableIcon64Regular />,
  },
  'TableIcon',
);
