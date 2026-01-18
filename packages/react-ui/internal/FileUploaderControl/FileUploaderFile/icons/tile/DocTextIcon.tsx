import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer.js';
import { DocTextIcon24Regular } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon24Regular.js';
import { DocTextIcon32Regular } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon32Regular.js';
import { DocTextIcon64Regular } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon64Regular.js';

export const DocTextIcon = iconSizer(
  {
    small: () => <DocTextIcon24Regular />,
    medium: () => <DocTextIcon32Regular />,
    large: () => <DocTextIcon64Regular />,
  },
  'DocTextIcon',
);
