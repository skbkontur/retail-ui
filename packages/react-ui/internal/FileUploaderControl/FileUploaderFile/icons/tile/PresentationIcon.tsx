import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { PresentationIcon24Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon24Regular.js';
import { PresentationIcon32Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon32Regular.js';
import { PresentationIcon64Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon64Regular.js';

export const PresentationIcon = iconSizer(
  {
    small: () => <PresentationIcon24Regular />,
    medium: () => <PresentationIcon32Regular />,
    large: () => <PresentationIcon64Regular />,
  },
  'PresentationIcon',
);
