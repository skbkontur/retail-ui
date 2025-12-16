import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { MarkupIcon16Solid } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon16Solid';
import { MarkupIcon20Solid } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon20Solid';
import { MarkupIcon24Solid } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon24Solid';

export const MarkupIcon = iconSizer(
  {
    small: () => <MarkupIcon16Solid />,
    medium: () => <MarkupIcon20Solid />,
    large: () => <MarkupIcon24Solid />,
  },
  'MarkupIcon',
);
