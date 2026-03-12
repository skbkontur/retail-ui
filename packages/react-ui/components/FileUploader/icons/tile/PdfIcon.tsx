import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { PdfIcon24Regular } from '../../../../internal/icons2022/FileTypePdfIcon/PdfIcon24Regular.js';
import { PdfIcon32Regular } from '../../../../internal/icons2022/FileTypePdfIcon/PdfIcon32Regular.js';
import { PdfIcon64Regular } from '../../../../internal/icons2022/FileTypePdfIcon/PdfIcon64Regular.js';

export const PdfIcon = iconSizer(
  {
    small: () => <PdfIcon24Regular />,
    medium: () => <PdfIcon32Regular />,
    large: () => <PdfIcon64Regular />,
  },
  'PdfIcon',
);
