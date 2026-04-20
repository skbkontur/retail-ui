import React from 'react';

import { TextIcon24Regular } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon24Regular.js';
import { TextIcon32Regular } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon32Regular.js';
import { TextIcon64Regular } from '../../../../internal/icons2022/FileTypeTextIcon/TextIcon64Regular.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon24Regular />,
    medium: () => <TextIcon32Regular />,
    large: () => <TextIcon64Regular />,
  },
  'TextIcon',
);
