import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { PictureIcon24Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon24Regular';
import { PictureIcon32Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon32Regular';
import { PictureIcon64Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon64Regular';

export const PictureIcon = iconSizer(
  {
    small: () => <PictureIcon24Regular />,
    medium: () => <PictureIcon32Regular />,
    large: () => <PictureIcon64Regular />,
  },
  'PictureIcon',
);
