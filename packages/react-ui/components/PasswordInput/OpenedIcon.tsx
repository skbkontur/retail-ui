import React from 'react';

import { EyeOpenIcon16Light } from '../../internal/icons2022/EyeOpenIcon/EyeOpenIcon16Light.js';
import { EyeOpenIcon20Light } from '../../internal/icons2022/EyeOpenIcon/EyeOpenIcon20Light.js';
import { EyeOpenIcon24Regular } from '../../internal/icons2022/EyeOpenIcon/EyeOpenIcon24Regular.js';
import { iconSizer } from '../../internal/icons2022/iconSizer.js';

export const OpenedIcon = iconSizer(
  {
    small: () => <EyeOpenIcon16Light />,
    medium: () => <EyeOpenIcon20Light />,
    large: () => <EyeOpenIcon24Regular />,
  },
  'OpenedIcon',
);
