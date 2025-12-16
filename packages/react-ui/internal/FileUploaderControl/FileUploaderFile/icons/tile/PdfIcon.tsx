import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { PdfIcon24Regular } from '../../../../icons2022/FileTypePdfIcon/PdfIcon24Regular';
import { PdfIcon32Regular } from '../../../../icons2022/FileTypePdfIcon/PdfIcon32Regular';
import { PdfIcon64Regular } from '../../../../icons2022/FileTypePdfIcon/PdfIcon64Regular';

export const PdfIcon = iconSizer(
  {
    small: () => <PdfIcon24Regular />,
    medium: () => <PdfIcon32Regular />,
    large: () => <PdfIcon64Regular />,
  },
  'PdfIcon',
);
