import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { MarkupIcon24Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon24Regular.js';
import { MarkupIcon32Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon32Regular.js';
import { MarkupIcon64Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon64Regular.js';

export const MarkupIcon = iconSizer(
  {
    small: () => <MarkupIcon24Regular />,
    medium: () => <MarkupIcon32Regular />,
    large: () => <MarkupIcon64Regular />,
  },
  'MarkupIcon',
);
