import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { TableIcon16Solid } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon16Solid.js';
import { TableIcon20Solid } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon20Solid.js';
import { TableIcon24Solid } from '../../../../internal/icons2022/FileTypeTableIcon/TableIcon24Solid.js';

export const TableIcon = iconSizer(
  {
    small: () => <TableIcon16Solid />,
    medium: () => <TableIcon20Solid />,
    large: () => <TableIcon24Solid />,
  },
  'TableIcon',
);
