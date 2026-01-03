import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { MarkupIcon24Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon24Regular';
import { MarkupIcon32Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon32Regular';
import { MarkupIcon64Regular } from '../../../../icons2022/FileTypeMarkupIcon/MarkupIcon64Regular';

export const MarkupIcon = iconSizer(
  {
    small: () => <MarkupIcon24Regular />,
    medium: () => <MarkupIcon32Regular />,
    large: () => <MarkupIcon64Regular />,
  },
  'MarkupIcon',
);
