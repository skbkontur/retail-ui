import React from 'react';

import { iconSizer } from '../../../../internal/icons2022/iconSizer.js';
import { DocTextIcon16Solid } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon16Solid.js';
import { DocTextIcon20Solid } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon20Solid.js';
import { DocTextIcon24Solid } from '../../../../internal/icons2022/FileTypeDocTextIcon/DocTextIcon24Solid.js';

export const DocTextIcon = iconSizer(
  {
    small: () => <DocTextIcon16Solid />,
    medium: () => <DocTextIcon20Solid />,
    large: () => <DocTextIcon24Solid />,
  },
  'DocTextIcon',
);
