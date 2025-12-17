import React from 'react';

import { iconSizer } from '../../../../icons2022/iconSizer';
import { DocTextIcon16Solid } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon16Solid';
import { DocTextIcon20Solid } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon20Solid';
import { DocTextIcon24Solid } from '../../../../icons2022/FileTypeDocTextIcon/DocTextIcon24Solid';

export const DocTextIcon = iconSizer(
  {
    small: () => <DocTextIcon16Solid />,
    medium: () => <DocTextIcon20Solid />,
    large: () => <DocTextIcon24Solid />,
  },
  'DocTextIcon',
);
