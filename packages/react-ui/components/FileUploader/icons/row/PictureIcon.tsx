import React from 'react';

import { PictureIcon16Solid } from '../../../../internal/icons2022/FileTypePictureIcon/PictureIcon16Solid.js';
import { PictureIcon20Solid } from '../../../../internal/icons2022/FileTypePictureIcon/PictureIcon20Solid.js';
import { PictureIcon24Solid } from '../../../../internal/icons2022/FileTypePictureIcon/PictureIcon24Solid.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const PictureIcon = iconSizer(
  {
    small: () => <PictureIcon16Solid />,
    medium: () => <PictureIcon20Solid />,
    large: () => <PictureIcon24Solid />,
  },
  'PictureIcon',
);
