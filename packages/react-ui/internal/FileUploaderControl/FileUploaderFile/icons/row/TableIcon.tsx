import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { TableIcon16Solid } from '../../../../icons2022/FileTypeTableIcon/TableIcon16Solid';
import { TableIcon20Solid } from '../../../../icons2022/FileTypeTableIcon/TableIcon20Solid';
import { TableIcon24Solid } from '../../../../icons2022/FileTypeTableIcon/TableIcon24Solid';

export const TableIcon = iconSizer(
  {
    small: () => <TableIcon16Solid />,
    medium: () => <TableIcon20Solid />,
    large: () => <TableIcon24Solid />,
  },
  'TableIcon',
);
