import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { PresentationIcon24Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon24Regular';
import { PresentationIcon32Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon32Regular';
import { PresentationIcon64Regular } from '../../../../icons2022/FileTypePresentationIcon/PresentationIcon64Regular';

export const PresentationIcon = iconSizer(
  {
    small: () => <PresentationIcon24Regular />,
    medium: () => <PresentationIcon32Regular />,
    large: () => <PresentationIcon64Regular />,
  },
  'PresentationIcon',
);
