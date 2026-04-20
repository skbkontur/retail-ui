import React from 'react';

import { TextIcon16Solid } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon16Solid.js';
import { TextIcon20Solid } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon20Solid.js';
import { TextIcon24Solid } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon24Solid.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon16Solid />,
    medium: () => <TextIcon20Solid />,
    large: () => <TextIcon24Solid />,
  },
  'TextIcon',
);
