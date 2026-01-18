import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { PresentationIcon16Solid } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon16Solid.js';
import { PresentationIcon20Solid } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon20Solid.js';
import { PresentationIcon24Solid } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon24Solid.js';

export const PresentationIcon = iconSizer(
  {
    small: () => <PresentationIcon16Solid />,
    medium: () => <PresentationIcon20Solid />,
    large: () => <PresentationIcon24Solid />,
  },
  'PresentationIcon',
);
