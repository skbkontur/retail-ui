import React from 'react';

import { PresentationIcon16Solid } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon16Solid.js';
import { PresentationIcon20Solid } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon20Solid.js';
import { PresentationIcon24Solid } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon24Solid.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const PresentationIcon = iconSizer(
  {
    small: () => <PresentationIcon16Solid />,
    medium: () => <PresentationIcon20Solid />,
    large: () => <PresentationIcon24Solid />,
  },
  'PresentationIcon',
);
