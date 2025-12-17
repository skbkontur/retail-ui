import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { PdfIcon16Solid } from '../../../../icons2022/FileTypePdfIcon/PdfIcon16Solid';
import { PdfIcon20Solid } from '../../../../icons2022/FileTypePdfIcon/PdfIcon20Solid';
import { PdfIcon24Solid } from '../../../../icons2022/FileTypePdfIcon/PdfIcon24Solid';

export const PdfIcon = iconSizer(
  {
    small: () => <PdfIcon16Solid />,
    medium: () => <PdfIcon20Solid />,
    large: () => <PdfIcon24Solid />,
  },
  'PdfIcon',
);
