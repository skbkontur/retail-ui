import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { TextIcon24Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon24Regular.js';
import { TextIcon32Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon32Regular.js';
import { TextIcon64Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon64Regular.js';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon24Regular />,
    medium: () => <TextIcon32Regular />,
    large: () => <TextIcon64Regular />,
  },
  'TextIcon',
);
