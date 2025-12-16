import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { TextIcon16Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon16Solid';
import { TextIcon20Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon20Solid';
import { TextIcon24Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon24Solid';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon16Solid />,
    medium: () => <TextIcon20Solid />,
    large: () => <TextIcon24Solid />,
  },
  'TextIcon',
);
