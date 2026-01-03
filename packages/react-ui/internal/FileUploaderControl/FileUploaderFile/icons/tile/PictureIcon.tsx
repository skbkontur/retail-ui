import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { PictureIcon24Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon24Regular.js';
import { PictureIcon32Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon32Regular.js';
import { PictureIcon64Regular } from '../../../../icons2022/FileTypePictureIcon/PictureIcon64Regular.js';

export const PictureIcon = iconSizer(
  {
    small: () => <PictureIcon24Regular />,
    medium: () => <PictureIcon32Regular />,
    large: () => <PictureIcon64Regular />,
  },
  'PictureIcon',
);
