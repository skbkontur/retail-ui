import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { TextIcon24Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon24Regular';
import { TextIcon32Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon32Regular';
import { TextIcon64Regular } from '../../../../icons2022/FileTypeTextIcon/TextIcon64Regular';

export const TextIcon = iconSizer(
  {
    small: () => <TextIcon24Regular />,
    medium: () => <TextIcon32Regular />,
    large: () => <TextIcon64Regular />,
  },
  'TextIcon',
);
