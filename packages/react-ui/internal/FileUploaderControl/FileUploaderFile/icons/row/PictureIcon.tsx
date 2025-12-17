import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { PictureIcon16Solid } from '../../../../icons2022/FileTypePictureIcon/PictureIcon16Solid';
import { PictureIcon20Solid } from '../../../../icons2022/FileTypePictureIcon/PictureIcon20Solid';
import { PictureIcon24Solid } from '../../../../icons2022/FileTypePictureIcon/PictureIcon24Solid';

export const PictureIcon = iconSizer(
  {
    small: () => <PictureIcon16Solid />,
    medium: () => <PictureIcon20Solid />,
    large: () => <PictureIcon24Solid />,
  },
  'PictureIcon',
);
