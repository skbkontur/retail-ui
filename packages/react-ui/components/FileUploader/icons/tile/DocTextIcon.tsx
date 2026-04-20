import React from 'react';

import { DocTextIcon24Regular } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon24Regular.js';
import { DocTextIcon32Regular } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon32Regular.js';
import { DocTextIcon64Regular } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon64Regular.js';
import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';

export const DocTextIcon = iconSizer(
  {
    small: () => <DocTextIcon24Regular />,
    medium: () => <DocTextIcon32Regular />,
    large: () => <DocTextIcon64Regular />,
  },
  'DocTextIcon',
);
