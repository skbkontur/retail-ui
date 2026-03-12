import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { MarkupIcon16Solid } from '../../../../internal/icons2022/FileTypeMarkupIcon/MarkupIcon16Solid.js';
import { MarkupIcon20Solid } from '../../../../internal/icons2022/FileTypeMarkupIcon/MarkupIcon20Solid.js';
import { MarkupIcon24Solid } from '../../../../internal/icons2022/FileTypeMarkupIcon/MarkupIcon24Solid.js';

export const MarkupIcon = iconSizer(
  {
    small: () => <MarkupIcon16Solid />,
    medium: () => <MarkupIcon20Solid />,
    large: () => <MarkupIcon24Solid />,
  },
  'MarkupIcon',
);
