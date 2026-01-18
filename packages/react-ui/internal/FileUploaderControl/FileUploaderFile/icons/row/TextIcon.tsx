import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { TextIcon16Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon16Solid.js';
import { TextIcon20Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon20Solid.js';
import { TextIcon24Solid } from '../../../../icons2022/FileTypeTextIcon/TextIcon24Solid.js';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon16Solid />,
    medium: () => <TextIcon20Solid />,
    large: () => <TextIcon24Solid />,
  },
  'TextIcon',
);
