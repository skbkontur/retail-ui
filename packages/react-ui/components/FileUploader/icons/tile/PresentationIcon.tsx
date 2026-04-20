import React from 'react';

import { PresentationIcon24Regular } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon24Regular.js';
import { PresentationIcon32Regular } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon32Regular.js';
import { PresentationIcon64Regular } from '../../../../internal/icons2022/FileTypePresentationIcon/PresentationIcon64Regular.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const PresentationIcon = iconSizer(
  {
    small: () => <PresentationIcon24Regular />,
    medium: () => <PresentationIcon32Regular />,
    large: () => <PresentationIcon64Regular />,
  },
  'PresentationIcon',
);
